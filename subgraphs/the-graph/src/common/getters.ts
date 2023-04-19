import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import * as constants from "./constants";
import * as utils from "./utils";
import {
  FinancialsDailySnapshot,
  Protocol,
  RewardToken,
  Token,
  UsageMetricsDailySnapshot,
  UsageMetricsHourlySnapshot,
  _Indexer,
} from "../../generated/schema";
import { _ERC20 } from "../../generated/Staking/_ERC20";
import {
  PROTOCOL_NAME,
  PROTOCOL_SLUG,
} from "../../protocols/the-graph/src/constants";
import { getUsdPricePerToken } from "../prices";
import {
  BIGDECIMAL_ZERO,
  BIGINT_ZERO,
  INT_ZERO,
  ProtocolType,
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
} from "./constants";
import { Versions } from "../versions";
import { NetworkConfigs } from "../../configurations/configure";

export function getOrCreateProtocol(): Protocol {
  let protocol = Protocol.load(NetworkConfigs.getControllerAddress());

  if (!protocol) {
    protocol = new Protocol(NetworkConfigs.getControllerAddress());
    protocol.name = PROTOCOL_NAME;
    protocol.slug = PROTOCOL_SLUG;
    protocol.network = NetworkConfigs.getNetwork();
    protocol.type = ProtocolType.GENERIC;
    protocol.totalValueLockedUSD = BIGDECIMAL_ZERO;
    // Needed?
    protocol.protocolControlledValueUSD = BIGDECIMAL_ZERO;
    protocol.cumulativeSupplySideRevenueUSD = BIGDECIMAL_ZERO;
    protocol.cumulativeProtocolSideRevenueUSD = BIGDECIMAL_ZERO;
    protocol.cumulativeTotalRevenueUSD = BIGDECIMAL_ZERO;
    protocol.cumulativeUniqueUsers = INT_ZERO;
    protocol.totalPoolCount = INT_ZERO;
    protocol._totalGRTLocked = BIGINT_ZERO;
  }

  protocol.schemaVersion = Versions.getSchemaVersion();
  protocol.subgraphVersion = Versions.getSubgraphVersion();
  protocol.methodologyVersion = Versions.getMethodologyVersion();

  protocol.save();

  return protocol;
}

export function getOrCreateUsageMetricDailySnapshot(
  event: ethereum.Event
): UsageMetricsDailySnapshot {
  // Number of days since Unix epoch
  const id = event.block.timestamp.toI32() / SECONDS_PER_DAY;
  const dayId = id.toString();
  // Create unique id for the day
  let usageMetrics = UsageMetricsDailySnapshot.load(dayId);

  if (!usageMetrics) {
    const protocol = getOrCreateProtocol();

    usageMetrics = new UsageMetricsDailySnapshot(dayId);
    usageMetrics.protocol = protocol.id;

    usageMetrics.dailyActiveUsers = INT_ZERO;
    usageMetrics.cumulativeUniqueUsers = INT_ZERO;
    usageMetrics.dailyTransactionCount = INT_ZERO;
    usageMetrics.totalPoolCount = protocol.totalPoolCount;

    usageMetrics.blockNumber = event.block.number;
    usageMetrics.timestamp = event.block.timestamp;

    usageMetrics.save();
  }

  return usageMetrics;
}

export function getOrCreateUsageMetricHourlySnapshot(
  event: ethereum.Event
): UsageMetricsHourlySnapshot {
  // Number of days since Unix epoch
  const hour = event.block.timestamp.toI32() / SECONDS_PER_HOUR;
  const hourId = hour.toString();

  // Create unique id for the day
  let usageMetrics = UsageMetricsHourlySnapshot.load(hourId);

  if (!usageMetrics) {
    const protocol = getOrCreateProtocol();

    usageMetrics = new UsageMetricsHourlySnapshot(hourId);
    usageMetrics.protocol = protocol.id;

    usageMetrics.hourlyActiveUsers = INT_ZERO;
    usageMetrics.cumulativeUniqueUsers = INT_ZERO;
    usageMetrics.hourlyTransactionCount = INT_ZERO;

    usageMetrics.blockNumber = event.block.number;
    usageMetrics.timestamp = event.block.timestamp;

    usageMetrics.save();
  }

  return usageMetrics;
}

export function getOrCreateFinancialsDailySnapshot(
  event: ethereum.Event
): FinancialsDailySnapshot {
  // Number of days since Unix epoch
  const dayID = event.block.timestamp.toI32() / SECONDS_PER_DAY;
  const id = dayID.toString();

  let financialMetrics = FinancialsDailySnapshot.load(id);

  if (!financialMetrics) {
    const protocol = getOrCreateProtocol();

    financialMetrics = new FinancialsDailySnapshot(id);
    financialMetrics.protocol = protocol.id;

    financialMetrics.totalValueLockedUSD = BIGDECIMAL_ZERO;
    // Needed?
    financialMetrics.protocolControlledValueUSD = BIGDECIMAL_ZERO;
    financialMetrics.dailySupplySideRevenueUSD = BIGDECIMAL_ZERO;
    financialMetrics.cumulativeSupplySideRevenueUSD = BIGDECIMAL_ZERO;
    financialMetrics.dailyProtocolSideRevenueUSD = BIGDECIMAL_ZERO;
    financialMetrics.cumulativeProtocolSideRevenueUSD = BIGDECIMAL_ZERO;
    financialMetrics.dailyTotalRevenueUSD = BIGDECIMAL_ZERO;
    financialMetrics.cumulativeTotalRevenueUSD = BIGDECIMAL_ZERO;

    financialMetrics.blockNumber = event.block.number;
    financialMetrics.timestamp = event.block.timestamp;

    financialMetrics.save();
  }
  return financialMetrics;
}

export function getOrCreateToken(
  event: ethereum.Event,
  address: string
): Token {
  let token = Token.load(address);
  if (!token) {
    token = new Token(address);
    const erc20Contract = _ERC20.bind(Address.fromString(address));

    token.name = utils.readValue<string>(erc20Contract.try_name(), "");
    token.symbol = utils.readValue<string>(erc20Contract.try_symbol(), "");
    token.decimals = utils
      .readValue<BigInt>(
        erc20Contract.try_decimals(),
        constants.DEFAULT_DECIMALS_BIGINT
      )
      .toI32();

    const tokenPrice = getUsdPricePerToken(Address.fromString(address));
    token.lastPriceUSD = tokenPrice.usdPrice;
    token.lastPriceBlockNumber = event.block.number;

    token.save();
  }

  if (
    !token.lastPriceUSD ||
    !token.lastPriceBlockNumber ||
    event.block.number
      .minus(token.lastPriceBlockNumber!)
      .gt(constants.ETH_AVERAGE_BLOCK_PER_HOUR)
  ) {
    const tokenPrice = getUsdPricePerToken(Address.fromString(address));
    token.lastPriceUSD = tokenPrice.usdPrice;
    token.lastPriceBlockNumber = event.block.number;

    token.save();
  }
  return token as Token;
}

export function getOrCreateRewardToken(
  event: ethereum.Event,
  address: string,
  RewardTokenType: string
): RewardToken {
  let rewardToken = RewardToken.load(address);
  if (rewardToken == null) {
    const token = getOrCreateToken(event, address);
    rewardToken = new RewardToken(RewardTokenType + "-" + address);
    rewardToken.token = token.id;
    rewardToken.type = RewardTokenType;
    rewardToken.save();
  }
  return rewardToken as RewardToken;
}

export function getOrCreateIndexer(
  event: ethereum.Event,
  indexerAddress: Address
): _Indexer {
  const indexerAddressString = indexerAddress.toHexString();
  let indexer = _Indexer.load(indexerAddressString);
  if (!indexer) {
    indexer = new _Indexer(event.address.toHexString());
    indexer.indexingRewardCut = BIGINT_ZERO;
    indexer.queryFeeCut = BIGINT_ZERO;
    indexer.delegatedTokens = BIGINT_ZERO;
    indexer.cooldownBlocks = BIGINT_ZERO;

    indexer.save();
  }
  return indexer;
}

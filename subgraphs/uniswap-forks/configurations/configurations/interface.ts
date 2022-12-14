import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/Factory/Factory";

// This interface is to be used by the configurations classes for each protocol/network deployment.
// If a new configuration is needed for a deployment, add a new value to the configurations interface.
export interface Configurations {
  getNetwork(): string;
  getProtocolName(): string;
  getProtocolSlug(): string;
  getSchemaVersion(): string;
  getSubgraphVersion(): string;
  getMethodologyVersion(): string;
  getFactoryAddress(): Address;
  getFactoryContract(): Factory;
  getTradeFee(blockNumber: BigInt): BigDecimal;
  getProtocolFeeToOn(blockNumber: BigInt): BigDecimal;
  getLPFeeToOn(blockNumber: BigInt): BigDecimal;
  getProtocolFeeToOff(): BigDecimal;
  getLPFeeToOff(): BigDecimal;
  getFeeOnOff(): string;
  getRewardIntervalType(): string;
  getRewardTokenRate(): BigInt;
  getReferenceToken(): Address;
  getRewardToken(): Address;
  getWhitelistTokens(): Address[];
  getStableCoins(): Address[];
  getStableOraclePools(): Address[];
  getUntrackedPairs(): Address[];
  getUntrackedTokens(): Address[];
  getBrokenERC20Tokens(): Address[];
  getMinimumLiquidityThresholdTrackVolume(): BigDecimal;
  getMinimumLiquidityThresholdTrackPrice(): BigDecimal;
}

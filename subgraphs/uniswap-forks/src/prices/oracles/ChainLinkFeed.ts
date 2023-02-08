import * as utils from "../common/utils";
import * as constants from "../common/constants";
import { Address, ethereum } from "@graphprotocol/graph-ts";
import { CustomPriceType, OracleContract } from "../common/types";
import { ChainLinkContract } from "../../../generated/Factory/ChainLinkContract";

export function getChainLinkContract(
  contract: OracleContract,
  block: ethereum.Block
): ChainLinkContract | null {
  if (
    contract.startBlock.lt(block.number) ||
    utils.isNullAddress(contract.address)
  )
    return null;

  return ChainLinkContract.bind(contract.address);
}

export function getTokenPriceUSDC(
  tokenAddr: Address,
  block: ethereum.Block
): CustomPriceType {
  const config = utils.getConfig();
  if (!config) return new CustomPriceType();

  const chainLinkContract = getChainLinkContract(config.chainLink(), block);
  if (!chainLinkContract) return new CustomPriceType();

  const result = chainLinkContract.try_latestRoundData(
    tokenAddr,
    constants.CHAIN_LINK_USD_ADDRESS
  );

  if (!result.reverted) {
    const decimals = chainLinkContract.try_decimals(
      tokenAddr,
      constants.CHAIN_LINK_USD_ADDRESS
    );

    if (decimals.reverted) {
      return new CustomPriceType();
    }

    return CustomPriceType.initialize(
      result.value.value1.toBigDecimal(),
      decimals.value,
      "ChainlinkFeed"
    );
  }

  return new CustomPriceType();
}

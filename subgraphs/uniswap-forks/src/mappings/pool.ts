import { log } from "@graphprotocol/graph-ts";
import { _HelperStore } from "../../generated/schema";
import { Mint, Burn, Swap, Transfer, Sync } from "../../generated/templates/Pair/Pair";
import { createDeposit, createWithdraw, createSwapHandleVolumeAndFees } from "../common/creators";
import { handleTransferBurn, handleTransferMint, handleTransferToPoolBurn } from "../common/handlers";
import { updateFinancials, updateInputTokenBalances, updatePoolMetrics, updateTvlAndTokenPrices, updateUsageMetrics } from "../common/updateMetrics";
import { BIGINT_THOUSAND, UsageType, ZERO_ADDRESS } from "../common/constants";

export function handleTransfer(event: Transfer): void {
  log.warning("HELLO2", [])

  // ignore initial transfers for first adds
  if (event.params.to.toHexString() == ZERO_ADDRESS && event.params.value.equals(BIGINT_THOUSAND)) {
    return;
  }

  log.warning("HELLO3", [])
  // mints
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    handleTransferMint(event, event.params.value, event.params.to.toHexString());
  }
  // Case where direct send first on native token withdrawls.
  // For burns, mint tokens are first transferred to the pool before transferred for burn.
  // This gets the EOA that made the burn loaded into the _Transfer.
  log.warning("HELLO4", [])

  if (event.params.to == event.address) {
    handleTransferToPoolBurn(event, event.params.from.toHexString());
  }
  log.warning("HELLO5", [])

  // burn
  if (event.params.to.toHexString() == ZERO_ADDRESS && event.params.from == event.address) {
    handleTransferBurn(event, event.params.value, event.params.from.toHexString());
  }
  log.warning("HELLO6", [])

}

export function handleSync(event: Sync): void {
  log.warning("HELLO7", [])

  updateInputTokenBalances(event.address.toHexString(), event.params.reserve0, event.params.reserve1);
  updateTvlAndTokenPrices(event.address.toHexString(), event.block.number);
  log.warning("HELLO8", [])

}

export function handleMint(event: Mint): void {
  log.warning("HELLO9", [])

  createDeposit(event, event.params.amount0, event.params.amount1);
  updateUsageMetrics(event, event.params.sender, UsageType.DEPOSIT);
  updateFinancials(event);
  updatePoolMetrics(event);
  log.warning("HELLO10", [])

}

export function handleBurn(event: Burn): void {
  log.warning("HELLO11", [])

  createWithdraw(event, event.params.amount0, event.params.amount1);
  updateUsageMetrics(event, event.transaction.from, UsageType.WITHDRAW);
  updateFinancials(event);
  updatePoolMetrics(event);
  log.warning("HELLO12", [])

}

export function handleSwap(event: Swap): void {
  log.warning("HELLO13", [])

  createSwapHandleVolumeAndFees(
    event,
    event.params.to.toHexString(),
    event.params.sender.toHexString(),
    event.params.amount0In,
    event.params.amount1In,
    event.params.amount0Out,
    event.params.amount1Out
  );
  updateFinancials(event);
  updatePoolMetrics(event);
  updateUsageMetrics(event, event.transaction.from, UsageType.SWAP);
  log.warning("HELLO14", [])

}

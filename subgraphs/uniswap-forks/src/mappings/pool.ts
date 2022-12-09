import {
  Mint,
  Burn,
  Swap,
  Transfer,
  Sync,
} from "../../generated/templates/Pair/Pair";
import { log } from "@graphprotocol/graph-ts";

// Handle transfers event.
// The transfers are either occur as a part of the Mint or Burn event process.
// The tokens being transferred in these events are the LP tokens from the liquidity pool that emitted this event.
export function handleTransfer(event: Transfer): void {
  log.warning("Transfer event: {}", [event.params.to.toHexString()]);
}

// Handle Sync event.
// Emitted after every Swap, Mint, and Burn event.
// Gives information about the rebalancing of tokens used to update tvl, balances, and token pricing
export function handleSync(event: Sync): void {
  log.warning("Sync event: {}", [event.params.reserve0.toString()]);
}

// Handle a mint event emitted from a pool contract. Considered a deposit into the given liquidity pool.
export function handleMint(event: Mint): void {
  log.warning("Mint event: {}", [event.address.toHexString()]);
}

// Handle a burn event emitted from a pool contract. Considered a withdraw into the given liquidity pool.
export function handleBurn(event: Burn): void {
  log.warning("Burn event: {}", [event.address.toHexString()]);
}

// Handle a swap event emitted from a pool contract.
export function handleSwap(event: Swap): void {
  log.warning("Swap event: {}", [event.address.toHexString()]);
}

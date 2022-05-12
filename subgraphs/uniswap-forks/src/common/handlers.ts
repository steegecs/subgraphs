import { ethereum, BigInt, log } from "@graphprotocol/graph-ts";
import { getLiquidityPool, getOrCreateTransfer } from "./getters";
import { TransferType } from "./constants";

// Handle data from transfer event for mints. Used to populate deposit entity in the mint event.
export function handleTransferMint(event: ethereum.Event, value: BigInt, to: string): void {
  log.warning("HELLO3.11", [])

  let pool = getLiquidityPool(event.address.toHexString());
  log.warning("HELLO3.12", [])

  let transfer = getOrCreateTransfer(event);

  log.warning("HELLO3.13", [])

  // Tracks supply of minted LP tokens
  pool.outputTokenSupply = pool.outputTokenSupply!.plus(value);

  // if - create new mint if no mints so far or if last one is done already
  // else - This is done to remove a potential feeto mint --- Not active
  if (!transfer.type) {
    transfer.type = TransferType.MINT;

    // Address that is minted to
    transfer.sender = to;
    transfer.liquidity = value;
  } else if (transfer.type == TransferType.MINT) {
    // Updates the liquidity if the previous mint was a fee mint
    // Address that is minted to
    transfer.sender = to;
    transfer.liquidity = value;
  }
  log.warning(to + " to", [])
  log.warning(transfer.sender + " sender", [])


  transfer.save();
  pool.save();
}

// Handle data from transfer event for burns. Used to populate deposit entity in the burn event.
export function handleTransferToPoolBurn(event: ethereum.Event, from: string): void {
  let transfer = getOrCreateTransfer(event);

  transfer.type = TransferType.BURN;
  transfer.sender = from;

  transfer.save();
}

// Handle data from transfer event for burns. Used to populate deposit entity in the burn event.
export function handleTransferBurn(event: ethereum.Event, value: BigInt, from: string): void {
  let pool = getLiquidityPool(event.address.toHexString());
  let transfer = getOrCreateTransfer(event);

  // Tracks supply of minted LP tokens
  pool.outputTokenSupply = pool.outputTokenSupply!.minus(value);

  // Uses address from the transfer to pool part of the burn. Otherwise create with this transfer event.
  if (transfer.type == TransferType.BURN) {
    transfer.liquidity = value;
  } else {
    transfer.type = TransferType.BURN;
    transfer.sender = from;
    transfer.liquidity = value;
  }

  log.warning(from + " from", [])
  log.warning(transfer.sender + " sender", [])

  transfer.save();
  pool.save();
}

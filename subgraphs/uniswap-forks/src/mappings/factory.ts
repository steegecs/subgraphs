import { log } from "@graphprotocol/graph-ts";
import { PairCreated, SetFeeToCall } from "../../generated/Factory/Factory";

// Handle the creation of a new liquidity pool from the Factory contract
// Create the pool entity and track events from the new pool contract using the template specified in the subgraph.yaml
export function handlePairCreated(event: PairCreated): void {
  log.info("create farm {}    {}     {}", [
    event.params.pair.toHexString(),
    event.params.token0.toHexString(),
    event.params.token1.toHexString(),
  ]);
}

export function handleFeeTo(call: SetFeeToCall): void {
  log.warning("FeeTo: {}", [call.inputs._feeTo.toHexString()]);
}

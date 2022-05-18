// import { log } from "@graphprotocol/graph-ts";
<<<<<<<< HEAD:subgraphs/uniswap-forks/protocols/apeswap/src/mappings/masterchef/reward.ts
import { Deposit as DepositEvent, Withdraw as WithdrawEvent, EmergencyWithdraw } from "../../../../../generated/MasterChef/MasterChefApeswap";
import { _HelperStore } from "../../../../../generated/schema";
import { UsageType } from "../../../../../src/common/constants";
import { handleReward } from "../../common/handlers/handleReward";
========
import { Deposit as DepositEvent, Withdraw as WithdrawEvent, EmergencyWithdraw } from "../../../../generated/MasterChef/MasterChefApeswap";
import { _HelperStore } from "../../../../generated/schema";
import { UsageType } from "../../../common/constants";
import { handleReward } from "../../../common/masterChef/apeswap/handleReward";
>>>>>>>> masterMessari:subgraphs/uniswap-forks/src/mappings/masterChef/apeswap/reward.ts

export function handleDeposit(event: DepositEvent): void {
  handleReward(event, event.params.pid, event.params.amount, UsageType.DEPOSIT);
}

export function handleWithdraw(event: WithdrawEvent): void {
  handleReward(event, event.params.pid, event.params.amount, UsageType.WITHDRAW);
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  handleReward(event, event.params.pid, event.params.amount, UsageType.WITHDRAW);
}

// export function logPoolAddition(event: LogPoolAddition): void {
//   let pidPoolMapping = new _HelperStore(event.params.pid.toString());
//   pidPoolMapping.valueString = event.params.lpToken.toHexString();
//   pidPoolMapping.save();
// }
// export function logPoolAdditionV2(event: LogPoolAdditionV2): void {
//   let pidPoolMapping = new _HelperStore(event.params.pid.toString());
//   pidPoolMapping.valueString = event.params.lpToken.toHexString();
//   pidPoolMapping.save();
// }

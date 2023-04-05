import { Bytes, BigDecimal } from "@graphprotocol/graph-ts";
import { Factory } from "../../generated/Factory/Factory";

export interface Configurations {
  getNetwork(): string;
  getProtocolName(): string;
  getProtocolSlug(): string;
  getFactoryAddress(): Bytes;
  getFactoryContract(): Factory;
  getProtocolFeeOnOff(): string;
  getProtocolFeeRatio(fee: i64): BigDecimal;
  getRewardIntervalType(): string;
  getReferenceToken(): Bytes;
  getRewardToken(): Bytes;
  getWhitelistTokens(): Bytes[];
  getStableCoins(): Bytes[];
  getStableOraclePools(): Bytes[];
  getUntrackedPairs(): Bytes[];
  getUntrackedTokens(): Bytes[];
  getMinimumLiquidityThreshold(): BigDecimal;
}

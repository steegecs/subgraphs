import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

////////////////////////
///// Schema Enums /////
////////////////////////

// The enum values are derived from Coingecko slugs (converted to uppercase
// and replaced hyphens with underscores for Postgres enum compatibility)
export namespace Network {
  export const ARBITRUM = "ARBITRUM_ONE";
  export const AVALANCHE = "AVALANCHE";
  export const AURORA = "AURORA";
  export const BSC = "BINANCE_SMART_CHAIN";
  export const CELO = "CELO";
  export const CRONOS = "CRONOS";
  export const ETHEREUM = "ETHEREUM";
  export const FANTOM = "FANTOM";
  export const HARMONY = "HARMONY_SHARD_0";
  export const MOONBEAM = "MOONBEAM";
  export const MOONRIVER = "MOONRIVER";
  export const OPTIMISM = "OPTIMISTIC_ETHEREUM";
  export const POLYGON = "POLYGON_POS";
  export const XDAI = "XDAI";
}

export namespace ProtocolType {
  export const EXCHANGE = "EXCHANGE";
  export const LENDING = "LENDING";
  export const YIELD = "YIELD";
  export const BRIDGE = "BRIDGE";
  export const GENERIC = "GENERIC";
}

export namespace LendingType {
  export const CDP = "CDP";
  export const POOLED = "POOLED";
}

export namespace RiskType {
  export const GLOBAL = "GLOBAL";
  export const ISOLATED = "ISOLATED";
}

export namespace RewardTokenType {
  export const DEPOSIT = "DEPOSIT";
  export const BORROW = "BORROW";
}

//////////////////////////////
///// Ethereum Addresses /////
//////////////////////////////

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const AVAX_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const AVAX_NAME = "Avalanche";
export const AVAX_SYMBOL = "AVAX";

export const COMPTROLLER_ADDRESS = '0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4'
export const ORACLE = "0x36E039e6391A5E7A7267650979fdf613f659be5D"

export const QIAVAX_ADDRESS = "0x5C0401e81Bc07Ca70fAD469b451682c0d747Ef1c";
export const QI_ADDRESS = "0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5"

export const QIUSDC_ADDRESS = "0xBEb5d47A3f720Ec0a390d04b4d41ED7d9688bC7F"

////////////////////////
///// Type Helpers /////
////////////////////////

export const DEFAULT_DECIMALS = 18 as i32;

export const USDC_DECIMALS = 6;
export const USDC_DENOMINATOR = BigDecimal.fromString("1000000");

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);
export const BIGINT_TWO = BigInt.fromI32(2);
export const BIGINT_THOUSAND = BigInt.fromI32(1000);
export const BIGINT_MAX = BigInt.fromString(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935",
);

export const INT_ZERO = 0 as i32;
export const INT_ONE = 1 as i32;
export const INT_TWO = 2 as i32;

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);

export const MAX_UINT = BigInt.fromI32(2).times(BigInt.fromI32(255));

/////////////////////
///// Date/Time /////
/////////////////////

export const SECONDS_PER_DAY = 60 * 60 * 24 as i32; // 86400
export const SECONDS_PER_DAY_BI = BigInt.fromString(SECONDS_PER_DAY.toString())
export const SECONDS_PER_DAY_BD = new BigDecimal(SECONDS_PER_DAY_BI)
export const MS_PER_DAY = new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000));
export const DAYS_PER_YEAR = new BigDecimal(BigInt.fromI32(365));
export const SECONDS_PER_YEAR = new BigDecimal(BigInt.fromI32(31536000));
export const MS_PER_YEAR = DAYS_PER_YEAR.times(new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000)));
export const BLOCKS_PER_YEAR = BigDecimal.fromString("2102400");

/////////////////////////////
///// Protocol Specific /////
/////////////////////////////

export const NETWORK_ETHEREUM = Network.ETHEREUM;
export const PROTOCOL_TYPE = ProtocolType.LENDING;
export const LENDING_TYPE = LendingType.POOLED;
export const PROTOCOL_RISK_TYPE = RiskType.ISOLATED;
export const PROTOCOL_NAME = "Compound v2";
export const PROTOCOL_SLUG = "compound-v2";
export const SUBGRAPH_VERSION = "1.4.6";
export const SCHEMA_VERSION = "1.0.1";
export const COMPOUND_DECIMALS = 8;
///////
//////////////
///////

export const WINDOW_SIZE_SECONDS = 86400
export const WINDOW_SIZE_SECONDS_BD = BigDecimal.fromString(WINDOW_SIZE_SECONDS.toString())

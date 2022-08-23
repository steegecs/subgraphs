import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

////////////////////
///// Versions /////
////////////////////

export const PROTOCOL_SCHEMA_VERSION = "1.3.0";

/////////////////////
///// Protocols /////
/////////////////////
export namespace Protocol {
  export const APESWAP = "Apeswap";
  export const UNISWAP_V2 = "Uniswap V2";
  export const SUSHISWAP = "Sushiswap";
}
////////////////////////
///// Schema Enums /////
////////////////////////

// The network names corresponding to the Network enum in the schema.
// They are mainly intended for convenience on the data consumer side.
// The enum values are derived from Coingecko slugs (converted to uppercase
// and replaced hyphens with underscores for Postgres enum compatibility)
export namespace Network {
  export const ARBITRUM_ONE = "ARBITRUM_ONE";
  export const AVALANCHE = "AVALANCHE";
  export const AURORA = "AURORA";
  export const BSC = "BSC"; // aka BNB Chain
  export const CELO = "CELO";
  export const CRONOS = "CRONOS";
  export const MAINNET = "MAINNET"; // Ethereum mainnet
  export const FANTOM = "FANTOM";
  export const FUSE = "FUSE";
  export const MOONBEAM = "MOONBEAM";
  export const MOONRIVER = "MOONRIVER";
  export const NEAR_MAINNET = "NEAR_MAINNET";
  export const OPTIMISM = "OPTIMISM";
  export const MATIC = "MATIC"; // aka Polygon
  export const XDAI = "XDAI"; // aka Gnosis Chain
}

export namespace ProtocolType {
  export const EXCHANGE = "EXCHANGE";
  export const LENDING = "LENDING";
  export const YIELD = "YIELD";
  export const BRIDGE = "BRIDGE";
  export const GENERIC = "GENERIC";
}

export namespace VaultFeeType {
  export const MANAGEMENT_FEE = "MANAGEMENT_FEE";
  export const PERFORMANCE_FEE = "PERFORMANCE_FEE";
  export const DEPOSIT_FEE = "DEPOSIT_FEE";
  export const WITHDRAWAL_FEE = "WITHDRAWAL_FEE";
}

export namespace LiquidityPoolFeeType {
  export const FIXED_TRADING_FEE = "FIXED_TRADING_FEE";
  export const TIERED_TRADING_FEE = "TIERED_TRADING_FEE";
  export const DYNAMIC_TRADING_FEE = "DYNAMIC_TRADING_FEE";
  export const FIXED_LP_FEE = "FIXED_LP_FEE";
  export const DYNAMIC_LP_FEE = "DYNAMIC_LP_FEE";
  export const FIXED_PROTOCOL_FEE = "FIXED_PROTOCOL_FEE";
  export const DYNAMIC_PROTOCOL_FEE = "DYNAMIC_PROTOCOL_FEE";
}

export namespace RewardTokenType {
  export const DEPOSIT = "DEPOSIT";
  export const BORROW = "BORROW";
}

export namespace HelperStoreType {
  export const NATIVE_TOKEN = "NATIVE_TOKEN";
  export const USERS = "USERS";
  // Pool addresses are also stored in the HelperStore
}

export namespace TransferType {
  export const MINT = "MINT";
  export const BURN = "BURN";
  // Pool addresses are also stored in the HelperStore
}

export namespace FeeSwitch {
  export const ON = "ON";
  export const OFF = "OFF";
  // Pool addresses are also stored in the HelperStore
}

export namespace UsageType {
  export const DEPOSIT = "DEPOSIT";
  export const WITHDRAW = "WITHDRAW";
  export const SWAP = "SWAP";
}

export namespace RewardIntervalType {
  export const BLOCK = "BLOCK";
  export const TIMESTAMP = "TIMESTAMP";
  export const NONE = "NONE";
}

export namespace MasterChef {
  export const MINICHEF = "MINICHEF";
  export const MASTERCHEF = "MASTERCHEF";
  export const MASTERCHEFV2 = "MASTERCHEFV2";
  export const MASTERCHEFV3 = "MASTERCHEFV3";
}

export const DEFAULT_DECIMALS = 18;
export const USDC_DECIMALS = 6;
export const USDC_DENOMINATOR = BigDecimal.fromString("1000000");
export const BIGINT_NEG_ONE = BigInt.fromI32(-1);
export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_ONE = BigInt.fromI32(1);
export const BIGINT_TWO = BigInt.fromI32(2);
export const BIGINT_FIVE = BigInt.fromI32(5);
export const RECENT_BLOCK_THRESHOLD = BigInt.fromI32(5);
export const BIGINT_TEN = BigInt.fromI32(10);
export const BIGINT_FIFTY = BigInt.fromI32(50);
export const BIGINT_HUNDRED = BigInt.fromI32(100);
export const BIGINT_THOUSAND = BigInt.fromI32(1000);
export const BIGINT_FIVE_THOUSAND = BigInt.fromI32(5000);
export const BIGINT_TEN_THOUSAND = BigInt.fromI32(10000);
export const BIGINT_THREE_THOUSAND = BigInt.fromI32(25000);
export const BIGINT_ONE_HUNDRED_THOUSAND = BigInt.fromI32(100000);
export const BIGINT_TWO_HUNDRED_FIFTY_THOUSAND = BigInt.fromI32(250000);
export const BIGINT_FOUR_HUNDRED_THOUSAND = BigInt.fromI32(400000);
export const BIGINT_MAX = BigInt.fromString(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);

export const INT_NEGATIVE_ONE = -1 as i32;
export const INT_ZERO = 0 as i32;
export const INT_ONE = 1 as i32;
export const INT_TWO = 2 as i32;
export const INT_FOUR = 4 as i32;

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);
export const BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);
export const BIGDECIMAL_TEN = new BigDecimal(BIGINT_TEN);
export const BIGDECIMAL_HUNDRED = new BigDecimal(BIGINT_HUNDRED);

export const BIGDECIMAL_FIFTY_PERCENT = new BigDecimal(BIGINT_FIFTY);
export const MAX_UINT = BigInt.fromI32(2).times(BigInt.fromI32(255));
export const DAYS_PER_YEAR = new BigDecimal(BigInt.fromI32(365));
export const SECONDS_PER_DAY = 60 * 60 * 24;
export const SECONDS_PER_HOUR = 60 * 60;
export const MS_PER_DAY = new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000));
export const ONE_WEEK_IN_DAYS = BigInt.fromI32(7);

export const MS_PER_YEAR = DAYS_PER_YEAR.times(
  new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000))
);

// Imported into configurations typescript file to set minimum liquidity thresholds for estimating price using a liquidity pool;
export const MINIMUM_LIQUIDITY_THREE_THOUSAND = new BigDecimal(
  BIGINT_THREE_THOUSAND
);
export const MINIMUM_LIQUIDITY_FIVE_THOUSAND = new BigDecimal(
  BIGINT_FIVE_THOUSAND
);
export const MINIMUM_LIQUIDITY_TEN_THOUSAND = new BigDecimal(
  BIGINT_TEN_THOUSAND
);
export const MINIMUM_LIQUIDITY_ONE_THOUSAND = new BigDecimal(BIGINT_THOUSAND);
export const MINIMUM_LIQUIDITY_ONE_HUNDRED_THOUSAND = new BigDecimal(
  BIGINT_ONE_HUNDRED_THOUSAND
);
export const MINIMUM_LIQUIDITY_TWO_HUNDRED_FIFTY_THOUSAND = new BigDecimal(
  BIGINT_TWO_HUNDRED_FIFTY_THOUSAND
);
export const MINIMUM_LIQUIDITY_FOUR_HUNDRED_THOUSAND = new BigDecimal(
  BIGINT_FOUR_HUNDRED_THOUSAND
);

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const TOP_POOL = ["0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"];
export const TOP_TEN_POOLS = [
  "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
  "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
  "0x23fe4ee3bd9bfd1152993a7954298bb4d426698f",
  "0xe5ffe183ae47f1a0e4194618d34c5b05b98953a8",
  "0xf9c1fa7d41bf44ade1dd08d37cc68f67ae75bf92",
  "0x382a9a8927f97f7489af3f0c202b23ed1eb772b5",
  "0x811beed0119b4afce20d2583eb608c6f7af1954f",
  "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
  "0x94b0a3d511b6ecdb17ebf877278ab030acb0a878",
];
export const TOP_HUNDRED_POOLS = [
  "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
  "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
  "0x23fe4ee3bd9bfd1152993a7954298bb4d426698f",
  "0xe5ffe183ae47f1a0e4194618d34c5b05b98953a8",
  "0xf9c1fa7d41bf44ade1dd08d37cc68f67ae75bf92",
  "0x382a9a8927f97f7489af3f0c202b23ed1eb772b5",
  "0x811beed0119b4afce20d2583eb608c6f7af1954f",
  "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
  "0x94b0a3d511b6ecdb17ebf877278ab030acb0a878",
  "0xd3d2e2692501a5c9ca623199d38826e513033a17",
  "0x7d7e813082ef6c143277c71786e5be626ec77b20",
  "0xcfb8cf118b4f0abb2e8ce6dbeb90d6bc0a62693d",
  "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
  "0x9cbfb60a09a9a33a10312da0f39977cbdb7fde23",
  "0x7b73644935b8e68019ac6356c40661e1bc315860",
  "0x3dd49f67e9d5bc4c5e6634b3f70bfd9dc1b6bd74",
  "0xc5be99a02c6857f9eac67bbce58df5572498f40c",
  "0x2fdbadf3c4d5a8666bc06645b8358ab803996e28",
  "0xf6dcdce0ac3001b2f67f750bc64ea5beb37b5824",
  "0x3041cbd36888becc7bbcbc0045e3b1f144466f5f",
  "0x25647e01bd0967c1b9599fa3521939871d1d0888",
  "0xf82d8ec196fb0d56c6b82a8b1870f09502a49f88",
  "0xdc00ba87cc2d99468f7f34bc04cbf72e111a32f7",
  "0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f",
  "0x874376be8231dad99aabf9ef0767b3cc054c60ee",
  "0x55d5c232d921b9eaa6b37b5845e439acd04b4dba",
  "0x80b4d4e9d88d9f78198c56c5a27f3bacb9a685c5",
  "0xce84867c3c02b05dc570d0135103d3fb9cc19433",
  "0xda3a20aad0c34fa742bd9813d45bbf67c787ae0b",
  "0xa5e9c917b4b821e4e0a5bbefce078ab6540d6b5e",
  "0xc2adda861f89bbb333c90c492cb837741916a225",
  "0xccb63225a7b19dcf66717e4d40c9a72b39331d61",
  "0xc0bf97bffa94a50502265c579a3b7086d081664b",
  "0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244",
  "0x819f3450da6f110ba6ea52195b3beafa246062de",
  "0x570febdf89c07f256c75686caca215289bb11cfc",
  "0x4d5ef58aac27d99935e5b6b4a6778ff292059991",
  "0xffa98a091331df4600f87c9164cd27e8a5cd2405",
  "0x97e1fcb93ae7267dbafad23f7b9afaa08264cfd8",
  "0x6ada49aeccf6e556bb7a35ef0119cc8ca795294a",
  "0x3da1313ae46132a397d90d95b1424a9a7e3e0fce",
  "0x43ae24960e5534731fc831386c07755a2dc33d47",
  "0x8ae720a71622e824f576b4a8c03031066548a3b1",
  "0x7ba9b94127d434182287de708643932ec036d365",
  "0x94ae6d2390680ac6e6ee6069be42067d6ad72e2a",
  "0x70ec2fa6eccf4010eaf572d1c1a7bcbc72dec983",
  "0x6033368e4a402605294c91cf5c03d72bd96e7d8d",
  "0x87febfb3ac5791034fd5ef1a615e9d9627c2665d",
  "0xa5e79baee540f000ef6f23d067cd3ac22c7d9fe6",
  "0x32ce7e48debdccbfe0cd037cc89526e4382cb81b",
  "0x5281e311734869c64ca60ef047fd87759397efe6",
  "0x79fd3e7fe3e832c66a0c005fbc99319b5e851f04",
  "0xcd6bcca48069f8588780dfa274960f15685aee0e",
  "0x1bb0216bc8d249726c83d67f6f3e30569cec83d4",
  "0x452c60e1e3ae0965cd27db1c7b3a525d197ca0aa",
  "0x10e4a463f2ace6e3836fe547e885993844299be6",
  "0x80a0102a1e601c55fd3f136128bb2d222a879ff3",
  "0x61b62c5d56ccd158a38367ef2f539668a06356ab",
  "0x5fa464cefe8901d66c09b85d5fcdc55b3738c688",
  "0xd90a1ba0cbaaaabfdc6c814cdf1611306a26e1f8",
  "0x3b3d4eefdc603b232907a7f3d0ed1eea5c62b5f7",
  "0xcffdded873554f362ac02f8fb1f02e5ada10516f",
  "0x0379da7a5895d13037b6937b109fa8607a659adf",
  "0xd4405f0704621dbe9d4dea60e128e0c3b26bddbd",
  "0xb6ca52c7916ad7960c12dc489fd93e5af7ca257f",
  "0xc730ef0f4973da9cc0ab8ab291890d3e77f58f79",
  "0x854373387e41371ac6e307a1f29603c6fa10d872",
  "0x73a86455888902108bc88f5831919e23098b9b04",
  "0x08650bb9dc722c9c8c62e79c2bafa2d3fc5b3293",
  "0x21b8065d10f73ee2e260e5b47d3344d3ced7596e",
  "0xfd0a40bc83c5fae4203dec7e5929b446b07d1c76",
  "0xdc98556ce24f007a5ef6dc1ce96322d65832a819",
  "0xf20ef17b889b437c151eb5ba15a47bfc62bff469",
  "0xf66369997ae562bc9eec2ab9541581252f9ca383",
  "0xf91c12dae1313d0be5d7a27aa559b1171cc1eac5",
  "0x27fd0857f0ef224097001e87e61026e39e1b04d1",
  "0x88ff79eb2bc5850f27315415da8685282c7610f9",
  "0x66e33d2605c5fb25ebb7cd7528e7997b0afa55e8",
  "0xe6f19dab7d43317344282f803f8e8d240708174a",
  "0x4dd26482738be6c06c31467a19dcda9ad781e8c4",
  "0x0c722a487876989af8a05fffb6e32e45cc23fb3a",
  "0x60a39010e4892b862d1bb6bdde908215ac5af6f3",
  "0x26aad2da94c59524ac0d93f6d6cbf9071d7086f2",
  "0xba65016890709dbc9491ca7bf5de395b8441dc8b",
  "0x3b4b5be8a405545a7ff62c3bff71769d1fa578be",
  "0x9c4cc862f51b1ba90485de3502aa058ca4331f32",
  "0xc3d7aa944105d3fafe07fc1822102449c916a8d0",
  "0xe5c5227d8105d8d5f26ff3634eb52e2d7cc15b50",
  "0x7a809081f991ecfe0ab2727c7e90d2ad7c2e411e",
  "0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c",
  "0x56feaccb7f750b997b36a68625c7c596f0b41a58",
  "0xc76225124f3caab07f609b1d147a31de43926cd6",
  "0x98d677887af8a699be38ef6276f4cd84aca29d74",
  "0x01962144d41415cca072900fe87bbe2992a99f10",
  "0x11b1f53204d03e5529f09eb3091939e4fd8c9cf3",
  "0xc50ef7861153c51d383d9a7d48e6c9467fb90c38",
  "0xc60c479f3cc66f1654a4113f4949c98ce77a9995",
  "0x97c4adc5d28a86f9470c70dd91dc6cc2f20d2d4d",
  "0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5",
];

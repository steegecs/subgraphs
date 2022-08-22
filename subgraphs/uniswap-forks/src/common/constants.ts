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

export const TOP_POOL = ["0xe6c78983b07a07e0523b57e18aa23d3ae2519e05"];
export const TOP_TEN_POOLS = [
  "0xe6c78983b07a07e0523b57e18aa23d3ae2519e05",
  "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  "0x21b8065d10f73ee2e260e5b47d3344d3ced7596e",
  "0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5",
  "0xe1573b9d29e2183b1af0e743dc2754979a40d237",
  "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
  "0x7d7e813082ef6c143277c71786e5be626ec77b20",
  "0x61b62c5d56ccd158a38367ef2f539668a06356ab",
  "0x9928e4046d7c6513326ccea028cd3e7a91c7590a",
  "0x0617d5ffb29c03ac35f1863b8a50ce1b52d446f6",
];
export const TOP_HUNDRED_POOLS = [
  "0xe6c78983b07a07e0523b57e18aa23d3ae2519e05",
  "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
  "0x21b8065d10f73ee2e260e5b47d3344d3ced7596e",
  "0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5",
  "0xe1573b9d29e2183b1af0e743dc2754979a40d237",
  "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
  "0x7d7e813082ef6c143277c71786e5be626ec77b20",
  "0x61b62c5d56ccd158a38367ef2f539668a06356ab",
  "0x9928e4046d7c6513326ccea028cd3e7a91c7590a",
  "0x0617d5ffb29c03ac35f1863b8a50ce1b52d446f6",
  "0xccb63225a7b19dcf66717e4d40c9a72b39331d61",
  "0x93512394a82d278b9961e3891a59c6dc1c2e4f98",
  "0xd3d2e2692501a5c9ca623199d38826e513033a17",
  "0x48918f57fa7210ea7b20f23da8420e68df3578fe",
  "0x9c4fe5ffd9a9fc5678cfbd93aa2d4fd684b67c4c",
  "0xe2f95dae6c5763c357447fe1ffb3f2a884bdc0b5",
  "0xc86881ef494b049fe3e624ae6fdf542f58ab1931",
  "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
  "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
  "0x0af81cd5d9c124b4859d65697a4cd10ee223746a",
  "0x7b73644935b8e68019ac6356c40661e1bc315860",
  "0x3041cbd36888becc7bbcbc0045e3b1f144466f5f",
  "0x9816f26f43c4c02df0daae1a0ba6a4dcd30b8ab7",
  "0x4bacaaabe3e96959ddf3269d3092d5cea88fefe9",
  "0x7a809081f991ecfe0ab2727c7e90d2ad7c2e411e",
  "0x149148acc3b06b8cc73af3a10e84189243a35925",
  "0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244",
  "0x470e8de2ebaef52014a47cb5e6af86884947f08c",
  "0x97e1fcb93ae7267dbafad23f7b9afaa08264cfd8",
  "0xb20bd5d04be54f870d5c0d3ca85d82b34b836405",
  "0x0ee0cb563a52ae1170ac34fbb94c50e89adde4bd",
  "0x2b788a7b1a0ee0da8cb1d2769825198d9c95d19d",
  "0x97be09f2523b39b835da9ea3857cfa1d3c660cbb",
  "0xd6f3768e62ef92a9798e5a8cedd2b78907cecef9",
  "0x25647e01bd0967c1b9599fa3521939871d1d0888",
  "0x2d0ba902badaa82592f0e1c04c71d66cea21d921",
  "0xf778c77ec3696879cb5ac814984655aefe66d716",
  "0x0179d00549b44d3161b9c260815f8a5947a541b3",
  "0x11181bd3baf5ce2a478e98361985d42625de35d1",
  "0x684b00a5773679f88598a19976fbeb25a68e9a5f",
  "0x6033368e4a402605294c91cf5c03d72bd96e7d8d",
  "0x5281e311734869c64ca60ef047fd87759397efe6",
  "0xe3d3551bb608e7665472180a20280630d9e938aa",
  "0x63b61e73d3fa1fb96d51ce457cabe89fffa7a1f1",
  "0x8c1c499b1796d7f3c2521ac37186b52de024e58c",
  "0x873056a02255872514f05249d93228d788fe4fb4",
  "0xa5e9c917b4b821e4e0a5bbefce078ab6540d6b5e",
  "0x3854612b93b140726167cca5418b01e832515d42",
  "0xc5be99a02c6857f9eac67bbce58df5572498f40c",
  "0x27fd0857f0ef224097001e87e61026e39e1b04d1",
  "0xb079d6be3faf5771e354586dbc47d0a3d37c34fb",
  "0x9ec96dcb54331626b79d8450a3daa9bcfa02e0b0",
  "0xccab68f48531215b0707e8d908c43e7de73dbdbc",
  "0x8ae720a71622e824f576b4a8c03031066548a3b1",
  "0x3016a43b482d0480460f6625115bd372fe90c6bf",
  "0x4028daac072e492d34a3afdbef0ba7e35d8b55c4",
  "0x6ada49aeccf6e556bb7a35ef0119cc8ca795294a",
  "0xec54859519293b8784bc5bf28144166f313618af",
  "0x343fd171caf4f0287ae6b87d75a8964dc44516ab",
  "0x570febdf89c07f256c75686caca215289bb11cfc",
  "0xf6c4e4f339912541d3f8ed99dba64a1372af5e5b",
  "0xcaa004418eb42cdf00cb057b7c9e28f0ffd840a5",
  "0xcd6bcca48069f8588780dfa274960f15685aee0e",
  "0x3dd49f67e9d5bc4c5e6634b3f70bfd9dc1b6bd74",
  "0x603fb61742baed14c6b5922cef1ac0a2320c4cb6",
  "0xca7c2771d248dcbe09eabe0ce57a62e18da178c0",
  "0x8ef79d6c328c25da633559c20c75f638a4863462",
  "0x4a08cf0a7bca217c24b9ee99c0395052f3707d68",
  "0x3fb4cb7f1e2e5110adf709dd277d77381c886ea9",
  "0x7924a818013f39cf800f5589ff1f1f0def54f31f",
  "0x709f7b10f22eb62b05913b59b92ddd372d4e2152",
  "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
  "0xa626eb9cc7dec00703586414d0811e1ba2021443",
  "0xc730ef0f4973da9cc0ab8ab291890d3e77f58f79",
  "0xffa98a091331df4600f87c9164cd27e8a5cd2405",
  "0x171d6a77251f64865aa6250119ec661dabd0c947",
  "0x2caccf71bdf8fff97c06a46eca29b611b1a74b5e",
  "0x9c84f58bb51fabd18698efe95f5bab4f33e96e8f",
  "0xaf21b0ec0197e63a5c6cc30c8e947eb8165c6212",
  "0xaf996125e98b5804c00ffdb4f7ff386307c99a00",
  "0xf8d99cf7046dedcb1dc8cfc309aa96946c9b9db2",
  "0x05be6820730b30086d6355c44c424230aaff41fb",
  "0x3478b3ecc153ce61ea3c6788611fdbb374d4305d",
  "0xfcd13ea0b906f2f87229650b8d93a51b2e839ebd",
  "0xa29fe6ef9592b5d408cca961d0fb9b1faf497d6d",
  "0xb5f790a03b7559312d9e738df5056a4b4c8459f4",
  "0x700fc86c46299cf2a8fd86edadae3f57014351b0",
  "0x9c9c9843c119704aef237ee9939fc2406d708136",
  "0x60b505862e717b37882471b6086e75eb10f7eca7",
  "0x69884da24f31960f694a8fa1f30aa8e0416fbd04",
  "0x0e9971ff778b042d549994415fb2774b5a3fe7b6",
  "0xc3d7aa944105d3fafe07fc1822102449c916a8d0",
  "0x43ae24960e5534731fc831386c07755a2dc33d47",
  "0xc2adda861f89bbb333c90c492cb837741916a225",
  "0xdf60e6416fcf8c955fddf01148753a911f7a5905",
  "0xc0067d751fb1172dbab1fa003efe214ee8f419b6",
  "0x1f964ff83c54ce447adae5cb93f9ec17018bf55b",
  "0x811beed0119b4afce20d2583eb608c6f7af1954f",
  "0xda3706c9a099077e6bc389d1baf918565212a54d",
  "0x9af0f334f9f451ce9e650278e56fec212f35cec1",
];

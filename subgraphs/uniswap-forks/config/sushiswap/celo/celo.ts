import { BigDecimal } from '@graphprotocol/graph-ts';
import { ConfigurationFields } from '../../configurations/fields';
import { FieldMap } from '../../configurations/types';

export const SushiswapCeloConfigurations: FieldMap = {
  [ConfigurationFields.NETWORK]: "celo",
  [ConfigurationFields.PROTOCOL_NAME]: "Sushiswap",
  [ConfigurationFields.PROTOCOL_SLUG]: "sushiswap",
  [ConfigurationFields.FACTORY_ADDRESS]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
  [ConfigurationFields.TRADING_FEE]: BigDecimal.fromString("3"),
  [ConfigurationFields.PROTOCOL_FEE_TO_ON]: BigDecimal.fromString("0.5"),
  [ConfigurationFields.LP_FEE_TO_ON]: BigDecimal.fromString("2.5"),
  [ConfigurationFields.PROTOCOL_FEE_TO_OFF]: BigDecimal.fromString("0.0"),
  [ConfigurationFields.LP_FEE_TO_OFF]: BigDecimal.fromString("3"),
  [ConfigurationFields.FEE_ON_OFF]: "ON",
  [ConfigurationFields.REWARD_INTERVAL_TYPE]: "TIMESTAMP",
  [ConfigurationFields.REFERENCE_TOKEN]: "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
  [ConfigurationFields.REWARD_TOKENS]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",  
  [ConfigurationFields.WHITELIST_TOKENS]: [
    "0x471ece3750da237f93b8e339c536989b8978a438",
    "0x765de816845861e75a25fca122bb6898b8b1282a",
    "0xef4229c8c3250c675f21bcefa42f58efbff6002a",
    "0x88eec49252c8cbc039dcdb394c0c2ba2f1637ea0",
    "0x90ca507a5d4458a4c6c6249d186b6dcb02a5bccd",
    "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73",
    "0xbaab46e28388d2779e6e31fd00cf0e5ad95e327b"
  ],
  [ConfigurationFields.STABLE_COINS]: [
    "0xef4229c8c3250C675F21BCefa42f58EfbfF6002a", // USDC
    "0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd", // DAI
    "0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0", // USDT
  ],
  [ConfigurationFields.STABLE_ORACLE_POOLS]: [
    "0x93887e0fa9f6c375b2765a6fe885593f16f077f9", // wETH/USDC
    "0xc77398cfb7b0f7ab42bafc02abc20a69ce8cef7f", // wETH/USDT
    "0xccd9d850ef40f19566cd8df950765e9a1a0b9ef2", // wETH/DAI
  ],
  [ConfigurationFields.UNTRACKED_PAIRS]: []
}
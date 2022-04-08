// store common calculations
import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { BenqiTokenqi } from "../../../generated/templates/BenqiTokenqi/BenqiTokenqi";

// turn exponent into a BigDecimal number
export function exponentToBigDecimal(decimals: i32): BigDecimal {
  let bigDecimal = BigDecimal.fromString("1");
  for (let i = 0; i < decimals; i++) {
    bigDecimal = bigDecimal.times(BigDecimal.fromString("10"));
  }
  return bigDecimal;
}

// get the amount in underlying token from cToken
export function getExchangeRate(marketAddress: Address): BigInt {
  let BenqiTokenqiContract = BenqiTokenqi.bind(marketAddress);
  /*
   * Exchange rate explained:
   * In Practice:
   *    - if you call cDAI on etherscan you get (2.0 * 10^26)
   *    - if you call cUSDC on etherscan you get (2.0 * 10^14)
   *    - the real value is ~0.02 so cDAI is off by 10^28, and cUSDC 10^16
   * How to accomadate this:
   *    - must divide by tokenDecimals, so 10^underlyingDecimals (use exponenttoBigDecimal())
   *    - must multiply by cTokenDecimals, so 10^COMPOUND_DECIMALS
   *    - must divide by mantissaFactorBD, so 10^18
   */
  let exchangeRate = BenqiTokenqiContract.exchangeRateStored();

  return exchangeRate;
}
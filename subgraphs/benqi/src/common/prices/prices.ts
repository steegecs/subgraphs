import {
    COMPTROLLER_ADDRESS,
    BIGDECIMAL_ZERO,
    QIAVAX_ADDRESS,
  } from "../../common/utils/constants";
  import { Token, LendingProtocol, Market } from "../../../generated/schema";
  import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
  import { Oracle } from "../../../generated/Comptroller/Oracle";
  import { exponentToBigDecimal } from "../utils/utils";
  
  // returns the token price
  export function getUSDPriceOfToken(market: Market): BigDecimal {
    let qiTokenAddress = market.id;
    let getToken = Token.load(market.inputTokens[0]);
    if (getToken == null) {
      log.error("Couldn't find input token for market {}", [market.id]);
      return BIGDECIMAL_ZERO;
    }
    let getTokenDecimals = getToken.decimals;
    let tokenPrice: BigDecimal;
  
    let avaxPriceUSD = getUSDPriceAvax();
  
    if (qiTokenAddress == QIAVAX_ADDRESS) {
        tokenPrice = avaxPriceUSD.truncate(getTokenDecimals);
    } else {
      let tokenPriceUSD = getTokenPrice(Address.fromString(qiTokenAddress), getTokenDecimals);
      tokenPrice = tokenPriceUSD.truncate(getTokenDecimals);
    }    

    return tokenPrice;
  }
  
  /////////////////
  //// Helpers ////
  /////////////////
  
  // get usd price of underlying tokens (NOT eth)
  export function getTokenPrice(
    qiTokenAddress: Address,
    underlyingDecimals: i32,
  ): BigDecimal {
    let protocol = LendingProtocol.load(COMPTROLLER_ADDRESS)!;
    let oracleAddress = protocol._priceOracle!;
    let underlyingPrice: BigDecimal;
  
    let mantissaDecimalFactor = 18 - underlyingDecimals + 18;
    let bdFactor = exponentToBigDecimal(mantissaDecimalFactor);
    let oracle = Oracle.bind(Address.fromBytes(oracleAddress));
    let tryPrice = oracle.try_getUnderlyingPrice(qiTokenAddress);
  
    underlyingPrice = tryPrice.reverted ? BIGDECIMAL_ZERO : tryPrice.value.toBigDecimal().div(bdFactor);
  
    return underlyingPrice;
  }
  

  export function getUSDPriceAvax(): BigDecimal {
    let protocol = LendingProtocol.load(COMPTROLLER_ADDRESS)!;
    let mantissaFactorBD = exponentToBigDecimal(18);
    let oracleAddress = protocol._priceOracle!;
    let oracle = Oracle.bind(Address.fromBytes(oracleAddress));
    let tryPrice = oracle.try_getUnderlyingPrice(Address.fromString(QIAVAX_ADDRESS));
  
    let ethPriceInUSD = tryPrice.reverted ? BIGDECIMAL_ZERO : tryPrice.value.toBigDecimal().div(mantissaFactorBD);
  
    return ethPriceInUSD;
  }
import { log } from "@graphprotocol/graph-ts/index";
import { BigDecimal } from "@graphprotocol/graph-ts/index";
import { getLiquidityPool, getLiquidityPoolAmounts, getOrCreateEtherHelper, getOrCreateTokenTracker } from "./../getters";
import { LiquidityPool, _HelperStore, _LiquidityPoolAmount, _TokenTracker } from "../../../generated/schema";
import {
  BIGDECIMAL_ZERO,
  BIGDECIMAL_ONE,
  BIGDECIMAL_TWO,
  BIGINT_ZERO,
  NATIVE_TOKEN,
  STABLE_ORACLE_POOLS,
  STABLE_COINS,
  WHITELIST,
  MINIMUM_USD_THRESHOLD_NEW_PAIRS,
  UNTRACKED_PAIRS,
  MINIMUM_ETH_LOCKED,
} from "./../constants";
import { safeDiv } from "../utils/utils";

export function getEthPriceInUSD(): BigDecimal {
  let nativeAmount = BIGDECIMAL_ZERO;
  let stableAmount = BIGDECIMAL_ZERO;
  // fetch average price of NATIVE_TOKEN_ADDRESS from STABLE_ORACLES
  for (let i = 0; i < STABLE_ORACLE_POOLS.length; i++) {
    let pool = _LiquidityPoolAmount.load(STABLE_ORACLE_POOLS[i]);
    if (!pool) continue;
    if (pool.inputTokens[0] == NATIVE_TOKEN) {
      if (pool.inputTokenBalances[1] > stableAmount) {
        nativeAmount = pool.inputTokenBalances[0];
        stableAmount = pool.inputTokenBalances[1];
      }
    } else {
      if (pool.inputTokenBalances[0] > stableAmount) {
        nativeAmount = pool.inputTokenBalances[1];
        stableAmount = pool.inputTokenBalances[0];
      }
    }
  }
  if (stableAmount.notEqual(BIGDECIMAL_ZERO)) {
    return stableAmount.div(nativeAmount);
  } else {
    return BIGDECIMAL_ZERO;
  }
}

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (add stablecoin estimates)
 **/

export function findEthPerToken(tokenTracker: _TokenTracker): BigDecimal {
  if (tokenTracker.id == NATIVE_TOKEN) {
    return BIGDECIMAL_ONE;
  }
  let whiteList = tokenTracker.whitelistPools;
  // for now just take USD from pool with greatest TVL
  // need to update this to actually detect best rate based on liquidity distribution
  let largestLiquidityETH = BIGDECIMAL_ZERO;
  let priceSoFar = BIGDECIMAL_ZERO;
  let ether = getOrCreateEtherHelper();

  // hardcoded fix for incorrect rates
  // if whitelist includes token - get the safe price
  if (STABLE_COINS.includes(tokenTracker.id)) {
    priceSoFar = safeDiv(BIGDECIMAL_ONE, ether.valueDecimal!);
  } else {
    for (let i = 0; i < whiteList.length; ++i) {
      let poolAddress = whiteList[i];
      let poolAmounts = getLiquidityPoolAmounts(poolAddress);
      let pool = getLiquidityPool(poolAddress);

      if (pool.outputTokenSupply!.gt(BIGINT_ZERO)) {
        if (pool.inputTokens[0] == tokenTracker.id) {
          // whitelist token is token1
          let tokenTracker1 = getOrCreateTokenTracker(pool.inputTokens[1]);
          // get the derived ETH in pool
          let ethLocked = poolAmounts.inputTokenBalances[1].times(tokenTracker1.derivedETH);
          if (ethLocked.gt(largestLiquidityETH) && ethLocked.gt(MINIMUM_ETH_LOCKED)) {
            largestLiquidityETH = ethLocked;
            // token1 per our token * Eth per token1
            priceSoFar = safeDiv(poolAmounts.inputTokenBalances[1], poolAmounts.inputTokenBalances[0]).times(tokenTracker1.derivedETH as BigDecimal);
          }
        }
        if (pool.inputTokens[1] == tokenTracker.id) {
          let tokenTracker0 = getOrCreateTokenTracker(pool.inputTokens[0]);
          // get the derived ETH in pool
          let ethLocked = poolAmounts.inputTokenBalances[0].times(tokenTracker0.derivedETH);
          if (ethLocked.gt(largestLiquidityETH) && ethLocked.gt(MINIMUM_ETH_LOCKED)) {
            largestLiquidityETH = ethLocked;
            // token0 per our token * ETH per token0
            priceSoFar = safeDiv(poolAmounts.inputTokenBalances[0], poolAmounts.inputTokenBalances[1]).times(tokenTracker0.derivedETH as BigDecimal);
          }
        }
      }
    }
  }
  return priceSoFar; // nothing was found return 0
}

/**
 * Accepts tokens and amounts, return tracked amount based on token whitelist
 * If one token on whitelist, return amount in that token converted to USD.
 * If both are, return average of two amounts
 * If neither is, return 0
 */
export function getTrackedVolumeUSD(
  tokenAmount0: BigDecimal,
  token0: _TokenTracker,
  tokenAmount1: BigDecimal,
  token1: _TokenTracker,
  pool: LiquidityPool
): BigDecimal {
  let price0 = token0.derivedUSD;
  let price1 = token1.derivedUSD;

  // dont count tracked volume on these pairs - usually rebass tokens
  if (UNTRACKED_PAIRS.includes(pool.id)) {
    return BIGDECIMAL_ZERO;
  }

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (pool.liquidityProviderCount.lt(BigInt.fromI32(5))) {
    let reserve0USD = pair.reserve0.times(price0);
    let reserve1USD = pair.reserve1.times(price1);
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD;
      }
    }
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      if (reserve0USD.times(BigDecimal.fromString("2")).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD;
      }
    }
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      if (reserve1USD.times(BigDecimal.fromString("2")).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) {
        return ZERO_BD;
      }
    }
  }

  // both are whitelist tokens, take average of both amounts
  if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount0
      .times(price0)
      .plus(tokenAmount1.times(price1))
      .div(BigDecimal.fromString("2"));
  }

  // take full value of the whitelisted token amount
  if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
    return tokenAmount0.times(price0);
  }

  // take full value of the whitelisted token amount
  if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
    return tokenAmount1.times(price1);
  }

  // neither token is on white list, tracked volume is 0
  return ZERO_BD;
}

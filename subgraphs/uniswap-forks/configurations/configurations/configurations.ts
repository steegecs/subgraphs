import { UniswapV2MainnetConfigurations } from "../../protocols/uniswap-v2/config/mainnet/mainnet";
import { ApeswapBscConfigurations } from "../../protocols/apeswap/config/bsc/bsc";
import { ApeswapMaticConfigurations } from "../../protocols/apeswap/config/matic/matic";
import { SushiswapArbitrumConfigurations } from "../../protocols/sushiswap/config/arbitrum/arbitrum";
import { SushiswapAvalancheConfigurations } from "../../protocols/sushiswap/config/avalanche/avalanche";
import { SushiswapBscConfigurations } from "../../protocols/sushiswap/config/bsc/bsc";
import { SushiswapCeloConfigurations } from "../../protocols/sushiswap/config/celo/celo";
import { SushiswapFantomConfigurations } from "../../protocols/sushiswap/config/fantom/fantom";
import { SushiswapFuseConfigurations } from "../../protocols/sushiswap/config/fuse/fuse";
import { SushiswapMainnetConfigurations } from "../../protocols/sushiswap/config/mainnet/mainnet";
import { SushiswapMaticConfigurations } from "../../protocols/sushiswap/config/matic/matic";
import { SushiswapMoonbeamConfigurations } from "../../protocols/sushiswap/config/moonbeam/moonbeam";
import { SushiswapMoonriverConfigurations } from "../../protocols/sushiswap/config/moonriver/moonriver";
import { SushiswapXdaiConfigurations } from "../../protocols/sushiswap/config/xdai/xdai";
import { Configurations } from "./interface";
import { Deploy } from "./deploy";
import { log } from "@graphprotocol/graph-ts";

export function getNetworkConfigurations(deploy: i32): Configurations {
    switch(deploy) {
        case Deploy.APESWAP_BSC: {
            return new ApeswapBscConfigurations();
        } case Deploy.APESWAP_MATIC: {
            return new ApeswapMaticConfigurations();
        } case Deploy.SUSHISWAP_ARBITRUM: {
            return new SushiswapArbitrumConfigurations();
        } case Deploy.SUSHISWAP_AVALANCHE: {
            return new SushiswapAvalancheConfigurations();
        } case Deploy.SUSHISWAP_BSC: {
            return new SushiswapBscConfigurations();
        } case Deploy.SUSHISWAP_CELO: {
            return new SushiswapCeloConfigurations();
        } case Deploy.SUSHISWAP_FANTOM: {
            return new SushiswapFantomConfigurations();
        } case Deploy.SUSHISWAP_FUSE: {
            return new SushiswapFuseConfigurations();
        } case Deploy.SUSHISWAP_MAINNET: {
            return new SushiswapMainnetConfigurations();
        } case Deploy.SUSHISWAP_MATIC: {
            return new SushiswapMaticConfigurations();
        } case Deploy.SUSHISWAP_MOONBEAM: {
            return new SushiswapMoonbeamConfigurations();
        } case Deploy.SUSHISWAP_MOONRIVER: {
            return new SushiswapMoonriverConfigurations();
        } case Deploy.SUSHISWAP_XDAI: {
            return new SushiswapXdaiConfigurations();
        } case Deploy.UNISWAP_V2_MAINNET: {
            return new UniswapV2MainnetConfigurations();
        } default: {
            log.critical("No configurations found for deployment protocol/network", []);
            return new SushiswapArbitrumConfigurations();
        }
    }
}
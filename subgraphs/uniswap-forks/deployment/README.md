## Version 1.0

## Deployment Instructions:
- Add/update configuraptions to the deployment/deploymentConfigurations.json file in order to add or update deployments.
    - Need to include template location for the protocol/network deployment and the deployment locations in the Hosted Service
    - Four Parameters:
        - --SUBGRAPH
        - --PROTOCOL
        - --NETWORK
        - --LOCATION

```
# Deploys uniswap-v2 from the uniswap-forks to mainnet in my hosted service.
npm run deploy --SUBGRAPH=uniswap-forks --PROTOCOL=uniswap-v2 --NETWORK=mainnet --LOCATION=steegecs

# Deploys uniswap-v2 from the uniswap-forks to all networks in my hosted service.
npm run deploy --SUBGRAPH=uniswap-forks --PROTOCOL=uniswap-v2 --LOCATION=steegecs

# Deploys protocols from the uniswap-forks and networks in my hosted service.
npm run deploy --SUBGRAPH=uniswap-forks --LOCATION=steege
```

## How to add new deployment

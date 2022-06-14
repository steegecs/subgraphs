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
npm run deploy --SUBGRAPH=uniswap-forks --LOCATION=steegecs
```

## How the CI/CD deployment works:
- The CI/CD deployment scripts and actions are use to allow you to deployment multiple subgraphs at a time and deploy on merge if specified in the deployment/deploymentConfigurations.json file. 
### Directory Structure: 
- Using these scripts requires a particular directory structure. This is because when the `npm` scripts are executed, the deployment scripts know where to look for configuration files and templates. Also, for the deploy-on-merge actions, the specific structure allows us to detect changes that may apply to specific subgraph (root directory of subgraph e.g. uniswap-forks), a specific subgraph and protocol, a specific subgraph protocol, and network, or some combination. This is then used to execute the particular subgraph deployments that have relevant changes if specified in deployment/deploymentConfigurations.json to the Hosted Service. 
- Within 


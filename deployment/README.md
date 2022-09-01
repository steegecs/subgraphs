## Deployment Instructions:

# Deploys uniswap-v2 to ethereum in steegecs hosted service.

npm run deploy --PROTOCOL=uniswap-v2 --NETWORK=ethereum --TARGET=steegecs --SERVICE=h --TYPE=deploy

**For deployments to Cronos network access token required**
npm run deploy --PROTOCOL=vvs-finance --NETWORK=cronos --TARGET=steegecs --SERVICE=c --ACCESS='access_token'

# Checks if uniswap-v2 is ready to deploy to ethereum in my hosted service and tests building the subgraph.

npm run deploy --PROTOCOL=uniswap-v2 --NETWORK=ethereum --TARGET=steegecs --SERVICE=h --TYPE=check

**For checks on the Cronos network access token required**
npm run deploy --PROTOCOL=vvs-finance --NETWORK=cronos --TARGET=steegecs --SERVICE=c --ACCESS='access_token'

# Builds uniswap-v2 for ethereum

npm run deploy --PROTOCOL=uniswap-v2 --NETWORK=ethereum --TYPE=build

# Ommission of --NETWORK for any of these operations will deploy/check/build the protocol for all specified networks in deployment.json

npm run deploy --PROTOCOL=uniswap-v2 --TARGET=steegecs --SERVICE=h --TYPE=deploy
npm run deploy --PROTOCOL=uniswap-v2 --TARGET=steegecs --SERVICE=h --TYPE=check
npm run deploy --PROTOCOL=uniswap-v2 --TYPE=build

- 3 Options

  - --PRINTLOGS
    - T/F/null - Set PRINTLOGS to 't' or 'true' to print all logs to the console instead of just to results.txt
  - --MERGE
    - T/F/null - Specifies whether this deployment is triggered by a merge. Should only be set to merge in the deployment action unless for testing.
  - --ACCESS
    - Specify the access token for deploying to a particular service. If not specified, deployment with occur for the current access location.
    - This is a required parameter when deploying to CRONOS chain.

- This works by taking the inputs from `npm run deploy` and using them to configure the subgraph.yaml, and optionally, configurations/configure.ts with a particulalar set of constants, and subsequently deploying to the specified hosted service account.

## How CI/CD deployment works:

- The CI/CD deployment scripts and actions allow you to deploy, build, or check the readyness for deployment of multiple subgraphs at a time.
- A response telling you if any information is missing or misplaced in the deployment.json, or if you specified invalid parameters or combinations in the script will be given. Errors will occur if your file structure does not conform to the standard -- See uniswap-forks as an example
- --TYPE=`build` --TYPE executes a clean build by first removing generated, build, subgraph.yaml, and configure.ts files and folders.
- --TYPE=`deploy` command excutes the same step as `build`, but it goes all the way to deployment.
- --TYPE=`check` command does everything `deploy` does except actually deploy the subgraph. What is different from `build` is that is runs all the same checks as `deploy`. Some do not apply to `build` - such as whether or not there is a valid deployment service in the deployment.json.
  - The deployment script will execute with `--TYPE=check` on each push to a remote branch in the Messari repository for relevant deployments that have been inpacted by the code changes.

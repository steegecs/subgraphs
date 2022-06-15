import os
import collections

changedFile = os.environ['CHANGED_FILES']
absolutePath = os.environ['ABSOLUTE_PATH']

# Parse a string by spaces and turn it into a list
changedFileList = changedFile.split(' ')
changedSchemaFilesDict = {}


declare -i deploy_any
declare -i deploy_all
declare -A deploy_protocol_all
declare -A deploy_network

deployAny=0
deployments = collections.defaultdict(dict)

# Iterate through all changed files
for changed_file in changedFileList:

    if 'subgraphs/subgraphs/' in changed_file:
        subgraphDir = changed_file.split('/subgraphs/subgraphs/')[0].split('/')[-1]
        deployments[subgraphDir] = {}
        # Check if the file contains the word "/src/"
        if '/src/' in changed_file:
            ref_folder = changed_file.split('/src/')[0].split('/')[-2]
            if ref_folder == 'subgraphs':
                deployments[subgraphDir]['ALL'] = 1
                deployAny=1
            elif ref_folder == 'protocols' and deployments[subgraphDir] != 'ALL':
                protocol = changed_file.split('/src/')[0].split('/')[-1]
                deployments[subgraphDir][protocol] = 'ALL'
                deploy_any=1
            else: 
                print("Warning: src/ folder should be located at subgraphs/**subgraph**/protocols/src/ or subgraphs/**subgraph**/src/")
        elif '/config' in changed_file:
            ref_folder = changed_file.split('/src/')[0].split('/')[-2]

            if ref_folder == 'protocols':
                ref_folder2 = changed_file.split('/config/')[1].split('/')[-1]

                if ref_folder2 == 'networks':
                    protocol = changed_file.split('/src/')[0].split('/')[-1]
                    network = changed_file.split('/config/')[1].split('/')[-2]

                    if protocol in deployments[subgraphDir] and 'ALL' not in deployments[subgraphDir][protocol]:
                        deployments[subgraphDir][protocol] = network
                        deployments[subgraphDir][protocol] = network
                    



          elif [[ ${changed_file} == *"/config/"* ]]; then
            ref_folder=$( echo ${changed_file%/config/*} | rev | cut -d / -f 2| rev);

            if [[ $ref_folder == protocols ]]; then
              ref_folder2=$( echo ${changed_file#*/config/} | cut -d / -f 1 );
              echo $ref_folder2

              if [[ $ref_folder2 == networks ]]; then
                protocol=$( echo ${changed_file%/config/*} | rev | cut -d / -f 1| rev);
                network=$( echo ${changed_file#*/config/} | rev | cut -d / -f 2| rev);

                protocol_network=$(echo ${protocol}_${network})
                deploy_network[$protocol_network]=1
                deploy_any=1;
              fi;
            else 
              echo "Warning: config/ folder should be located at subgraphs/**subgraph**/protocols/config/";
            fi;
          fi;
        done

        if [[ $deploy_any == 1 ]]; then
          npm install -g @graphprotocol/graph-cli
          npm install --dev @graphprotocol/graph-ts
          npm install mustache
          yarn install
          graph auth --product hosted-service 0845de8b9d834db8b16b5c97ba33ec53
          cd subgraphs/$(echo ${{ github.head_ref }} | cut -d / -f 1)

          if [[ $deploy_all == 1 ]]; then
            npm run deploy;
          else 
            for protocol in "${!deploy_protocol_all[@]}"; do
              if [[ ${deploy_protocol_all[$protocol]} == 1 ]]; then
                npm run deploy ${protocol} steegecs;
              fi;
            done

            for protocol_network in "${!deploy_network[@]}"; do
              if [[ ${deploy_network[$protocol_network]} == 1 ]]; then
                protocol=$( echo ${protocol_network} | cut -d _ -f 1);
                network=$( echo ${protocol_network} | cut -d _ -f 2);

                if ! [[ ${deploy_protocol[$protocol]} ]]; then
                  npm run deploy ${protocol} ${network} steegecs;
                fi;
              fi;
            done
          fi;
        fi;
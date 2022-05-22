import os
import collections

changedFile = os.environ['CHANGED_FILES']
absolutePath = os.environ['ABSOLUTE_PATH']
hostedServiceAccessToken = os.environ['HOSTED_SERVICE_ACCESS_TOKEN']

# Parse a string by spaces and turn it into a list
changedFileList = changedFile.split(' ')

# Inidicated if a file was changed indicating the necessity for deployment
deployAny=0

# Used to indicate the necessary deployment commands
deployAllDirectory = set()
deployAllProtocol = collections.defaultdict(set)
deployNetwork = collections.defaultdict(lambda : collections.defaultdict(set))

print(absolutePath)

# Iterate through all changed files
for changed_file in changedFileList:

    # If changed file is within a directory containing deployment code.
    if 'subgraphs/' in changed_file:
        subgraphDir = changed_file.split('subgraphs/')[1].split('/')[0]
        # Check if the file contains the word "/src/"
        if '/src/' in changed_file:
            ref_folder = changed_file.split('/src/')[0].split('/')[-2]
            # If src code is in common code folder for the directory
            if ref_folder == 'subgraphs':
                deployAllDirectory.add(subgraphDir)
                deployAny=1
            # if src code is in a protocol specific folder
            elif ref_folder == 'protocols':
                protocol = changed_file.split('/src/')[0].split('/')[-1]
                deployAllProtocol[subgraphDir].add(protocol)
                deployAny=1

        elif '/config' in changed_file:
            ref_folder = changed_file.split('/config/')[0].split('/')[-2]

            if ref_folder == 'protocols':
                ref_folder2 = changed_file.split('/config/')[1].split('/')[0]
                if ref_folder2 == 'networks':
                    protocol = changed_file.split('/config/')[0].split('/')[-1]
                    network = changed_file.split('/config/')[1].split('/')[1]

                    deployNetwork[subgraphDir][protocol].add(network)
                    deployAny=1
            else: 
              print("Warning: config/ folder should be located at subgraphs/**subgraph**/protocols/config/")
            
if deployAny == 1:
    # Install all necessary dependencies
    os.system('npm install -g @graphprotocol/graph-cli')
    os.system('npm install --dev @graphprotocol/graph-ts')
    os.system('npm install mustache')
    os.system('yarn install')
    os.system('graph auth --product hosted-service ' + hostedServiceAccessToken)
    
    # Deploy all protocols in the directory
    for subgraphDir in deployAllDirectory:
      path = absolutePath + '/subgraphs/' + subgraphDir
      os.system('cd ' + absolutePath + '/subgraphs/' + subgraphDir)
      os.system('npm --prefix ' + path + ' run deploy steegecs')

    # Deploy a specific protocol in the directory
    for subgraphDir in deployAllProtocol:
      if subgraphDir not in deployAllDirectory:
        for protocol in deployAllProtocol[subgraphDir]:
          path = absolutePath + '/subgraphs/' + subgraphDir
          os.system('npm --prefix ' + path + ' run deploy ' + protocol + ' steegecs')

    # Deploy a specific network for a protocol in the directory
    for subgraphDir in deployNetwork:
      for protocol in deployNetwork[subgraphDir]:
        if subgraphDir not in deployAllDirectory and protocol not in deployAllProtocol[subgraphDir]:
          for network in deployNetwork[subgraphDir][protocol]:
            path = absolutePath + '/subgraphs/' + subgraphDir
            os.system('cd ' + absolutePath + '/subgraphs/' + subgraphDir)
            os.system('npm --prefix ' + path + ' run deploy ' + protocol + ' ' + network + ' steegecs')
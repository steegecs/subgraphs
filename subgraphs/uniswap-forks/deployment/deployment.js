import * as protocolNetworkData from './deploymentConfigurations.json' assert {type: "json"}
import { exec } from 'child_process';


const protocolNetworkMap = JSON.parse(JSON.stringify(protocolNetworkData))['default']['protocols'] 
const configurations = JSON.parse(JSON.stringify(protocolNetworkData))['default']['configurations'] 


function runCommands(array, callback) {

    var index = 0;
    var results = [];

    function next() {
       if (index < array.length) {
           exec(array[index++], function(err, stdout) {
               if (err) return callback(err);
               // do the next iteration
               results.push(stdout);
               next();
           });
       } else {
           // all done here
           callback(null, results);
       }
    }
    // start the first iteration
    next();
}

if (process.argv.length == 2) {
    console.log('Error: please at least specify hosted service account to deploy all subgraphs (i.e. messari, steegecs, etc.)')
} else if (process.argv.length == 3) {
    if (!process.argv[4] in configurations['deployment']['locations']) {
        console.log('Error: please specify a deployment location only to deploy all subgraphs (i.e. steegecs, messari, etc.)')
    } else {
        for (const protocol in protocolNetworkMap) {
            for (const network in protocolNetworkMap[protocol]) {

                let template = protocolNetworkMap[process.argv[2]][process.argv[3]]['template']
                let location = protocolNetworkMap[process.argv[2]][process.argv[3]][process.argv[4]]

                let prepareYaml = 'npm run prepare:yaml --PROTOCOL=' + protocol + ' --NETWORK=' + network + ' --TEMPLATE=' + template
                let prepareConstants = 'npm run prepare:constants --PROTOCOL=' + protocol + ' --NETWORK=' + network
                let prepareBuild = 'yarn codegen && yarn build'
                let deployment = 'npm run deploy:subgraph --LOCATION=' + location

                let commands = [prepareYaml, prepareConstants, prepareBuild, deployment]

                runCommands(commands, function(err, results) {
                    // error or results here
                });
            }
        }
    }
} else if (process.argv.length == 4) {
    if (!process.argv[2] in protocolNetworkMap) {
        console.log('Error: please specify a valid protocol as 1st argument (i.e. uniswap-v2, sushiswap, etc.)')
        console.log('To deploy all networks of a specified protocol, pass 2 arguements (protocol/location)')
    } else if (!process.argv[3] in configurations['deployment']['locations']) {
        console.log('Error: please specify a deployment location as 2nd argument (i.e. steegecs, messari, etc.)')
        console.log('To deploy all networks of a specified protocol, pass 2 arguements (protocol/location)')
    } else {
        let protocol = process.argv[2]
        for (const network in protocolNetworkMap[process.argv[2]]) {
            let template = protocolNetworkMap[protocol][network]['template']
            let location = protocolNetworkMap[protocol][network][process.argv[3]]

            let prepareYaml = 'npm run prepare:yaml --PROTOCOL=' + protocol + ' --NETWORK=' + network + ' --TEMPLATE=' + template
            let prepareConstants = 'npm run prepare:constants --PROTOCOL=' + protocol + ' --NETWORK=' + network
            let prepareBuild = 'yarn codegen && yarn build'
            let deployment = 'npm run deploy:subgraph --LOCATION=' + location

            let commands = [prepareYaml, prepareConstants, prepareBuild, deployment]

            runCommands(commands, function(err, results) {
                // error or results here
            });
        }
    }
 } else if (process.argv.length == 5) {
    if (!process.argv[2] in protocolNetworkMap) {
        console.log('Error: please specify a valid protocol as 1st argument (i.e. uniswap-v2, sushiswap, etc.)')
        console.log('To deploy a protocol to a specific network, pass 3 arguements (protocol/network/location)')
    } else if (!process.argv[3] in protocolNetworkMap[process.argv[2]]) {
        console.log('Error: please specify a valid network as 2nd argument (i.e. mainnet, ropsten, etc.)')
        console.log('To deploy a protocol to a specific network, pass 3 arguements (protocol/network/location)')
    } else if (!process.argv[4] in configurations['deployment']['locations']) {
        console.log('Error: please specify a deployment location as 3rd argument (i.e. steegecs, messari, etc.)')
        console.log('To deploy a protocol to a specific network, pass 3 arguements (protocol/network/location)')
    } else {
        let protocol = process.argv[2]
        let network = process.argv[3]
        let template = protocolNetworkMap[process.argv[2]][process.argv[3]]['template']
        let location = protocolNetworkMap[process.argv[2]][process.argv[3]][process.argv[4]]

        let prepareYaml = 'npm run prepare:yaml --PROTOCOL=' + protocol + ' --NETWORK=' + network + ' --TEMPLATE=' + template
        let prepareConstants = 'npm run prepare:constants --PROTOCOL=' + protocol + ' --NETWORK=' + network
        let prepareBuild = 'yarn codegen && yarn build'
        let deployment = 'npm run deploy:subgraph --LOCATION=' + location

        let commands = [prepareYaml, prepareConstants, prepareBuild, deployment]

        runCommands(commands, function(err, results) {
            // error or results here
        });
    }
} else {
    console.log('Error: Too many arguments')
}
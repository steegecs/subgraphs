import * as fs from 'fs'
import * as chalk from 'chalk'
import { GluegunToolbox } from 'gluegun'
import {
  ScriptGeneratorArgs,
  ScriptGenerator,
} from '../command-helpers/build/scriptGenerator'

import { validateDeploymentJson } from '../../../deployment/validation/validateDeploymentJson'
import { getScopeAlias, getServiceAlias } from '../command-helpers/build/alias'
import { executeDeployment } from '../command-helpers/build/execution'

const HELP: string = `
${chalk.bold('messari build')} ${chalk.bold('[<deployment-id>]')} [options]

Options:

        --scope          Scope of the build/deployment <single | protocol | base>
    -s, --service        Service to deploy to <hosted-service | subgraph-studio | cronos-portal>
    -t, --token          API token to use for the deployment
    -r, --target         Target account for the deployment (i.e. messari)
        --slug <slug>    The slug to use for the deployment {optional - replace deployment.json slug}
    -d, --deploy         Deploy the build to the specified service {default: false}
    -l, --log            Print results to the console {default: false}
    -h, --help           Show usage information {default: false}
`

module.exports = {
  name: 'build',
  alias: ['b'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { info },
    } = toolbox

    let id = parameters.first

    let {
      l,
      log,
      scope,
      h,
      help,
      r,
      target,
      s,
      service,
      d,
      deploy,
      slug,
      t,
      token,
    } = parameters.options

    log = (l || log) === undefined ? false : true
    scope = getScopeAlias(scope)
    target = r || target
    service = getServiceAlias(s || service)
    deploy = (d || deploy) === undefined ? false : true
    token = t || token
    help = (h || help) === undefined ? false : true

    // Show help text if requested
    if (help) {
      info(HELP)
      return
    }

    // Check if the deployment.json file exists
    if (!fs.existsSync('../../deployment/deployment.json')) {
      info('deployment.json file not found')
      return
    }

    // Read the deployment.json file
    const deploymentJSONData = JSON.parse(
      fs.readFileSync('../../deployment/deployment.json', 'utf8')
    )

    // Check if deployment.json data is valid
    try {
      validateDeploymentJson(deploymentJSONData)
    } catch (e) {
      info(e.message)
      return
    }

    const askScope = {
      type: 'select',
      name: 'scope',
      message: 'Choose a scope:',
      choices: ['single', 'protocol', 'base'],
    }

    const askId = {
      type: 'input',
      name: 'id',
      message: 'Deployment id to use for the build/deployment',
      skip: id !== undefined,
    }

    const askService = {
      type: 'select',
      name: 'service',
      message: 'Choose a service:',
      choices: ['subgraph-studio', 'hosted-service', 'cronos-portal'],
      skip: !deploy,
    }

    const askTarget = {
      type: 'input',
      name: 'target',
      message: 'Target to deploy to:',
      skip: !deploy,
    }

    if (!['single', 'protocol', 'base'].includes(scope)) {
      scope = (await toolbox.prompt.ask(askScope)).scope
    }

    if (id === undefined) {
      id = (await toolbox.prompt.ask(askId)).id
    }

    if (
      !['subgraph-studio', 'hosted-service', 'cronos-portal'].includes(service)
    ) {
      service = (await toolbox.prompt.ask(askService)).service
    }

    if (target === undefined) {
      target = (await toolbox.prompt.ask(askTarget)).target
    }

    const askToken = {
      type: 'input',
      name: 'token',
      message: 'Please enter Cronos Portal API token:',
      skip: !deploy || service == 'cronos-portal' || token,
    }

    if (token === undefined && deploy && service == 'cronos-portal') {
      token = (await toolbox.prompt.ask(askToken)).token
    }

    const args: ScriptGeneratorArgs = {
      id,
      scope,
      target,
      service,
      deploy,
      token,
      slug,
      log,
    }

    console.log(args)
    // Use arguments to generate scrips for building subgraph
    let scriptGenerator = new ScriptGenerator(deploymentJSONData, args)
    scriptGenerator.prepare()
    executeDeployment(scriptGenerator, () => {})
  },
}

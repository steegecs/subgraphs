import * as fs from 'fs'
import * as chalk from 'chalk'
import { GluegunToolbox } from 'gluegun'
import { Input } from '../command-helpers/update.ts/questions/types'

import { validateDeploymentJson } from '../../../deployment/validation/validateDeploymentJson'

const HELP: string = `
${chalk.bold('messari add')}

Description: 
    Follow the prompts to add a new deployment to the deployment.json file

Options:
    -h, --help           Show usage information {default: false}
`

module.exports = {
  name: 'update',
  alias: ['u'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { info },
    } = toolbox

    let { h, help } = parameters.options

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

    const askScope: Input = {
      type: 'input',
      name: 'protocol',
      message: 'Input the protocol to add new deployment:',
    }

    let scope = (await toolbox.prompt.ask(askScope)).scope
    console.log(scope)
  },
}

import { GluegunToolbox } from 'gluegun'
import { writeEnvValue } from './writeEnv'
import * as fs from 'fs'
// const execSync = require('child_process').execSync

export async function checkRepoPath(
  toolbox: GluegunToolbox,
  MESSARI_REPO_PATH: string
) {
  const askSubgraphPath = {
    type: 'input',
    name: 'MESSARI_REPO_PATH',
    message:
      'Path from the root of your device to the messari subgraphs repo (Example: /Users/steege/Desktop/repos/subgraphs):',
  }

  while (!MESSARI_REPO_PATH || !fs.existsSync(MESSARI_REPO_PATH)) {
    console.log('Invalid path, please try again')
    MESSARI_REPO_PATH = (await toolbox.prompt.ask(askSubgraphPath))
      .MESSARI_REPO_PATH
  }

  writeEnvValue('MESSARI_REPO_PATH', MESSARI_REPO_PATH)
  process.env.MESSARI_REPO_PATH = MESSARI_REPO_PATH
}

import { build, system } from 'gluegun'
// const path = require('path')

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  let cli = build().brand('messari').src(__dirname)

  const pluginDirs = (
    await Promise.all(
      ['npm root -g', 'npm root', 'yarn global dir'].map(async (cmd) => {
        try {
          return await system.run(cmd, { trim: true })
        } catch (_) {
          return undefined
        }
      })
    )
  ).filter((dir) => dir !== undefined)

  // Inject potential plugin directories
  cli = pluginDirs.reduce((cli) => cli.plugin('./node_modules'), cli)

  let runtimeCLI = cli.help().version().defaultCommand().create()

  const toolbox = await runtimeCLI.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }

// the `entry.server.tsx` file requires app/refresh.ignored.js
// so if we change our content then update app/refresh.ignored.js we'll
// get an auto-refresh
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
require('dotenv').config()
require('@remix-run/node').installGlobals()
const chokidar = require('chokidar')
const watchPath = path.join(__dirname, '../../')
const refreshPath = path.join(__dirname, './src/refresh.ignored.js')

console.log(`Watching files from parent directory: ${watchPath}`)
chokidar
  .watch(watchPath, {
    depth: 99,
    ignored: ['**/node_modules/**', '**/build/**', '**/dist/**', '**/public/**', '**/refresh.ignored.js'],
  })
  .on('change', async (updatedFile) => {
    console.log(chalk.blue('File changed:', updatedFile))
    // give the cache a second to update
    setTimeout(() => {
      fs.writeFileSync(refreshPath, `// ${Date.now()}: ${updatedFile}`)
    }, 250)
  })

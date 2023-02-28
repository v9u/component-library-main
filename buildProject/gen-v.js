const inquirer = require('inquirer')
const cp = require('child_process')
const path = require('path')
const fs = require('fs')

const jsonFormat = require('json-format') //美化並轉換js
const promptList = [
  {
    type: 'list',
    message: '选择升级版本:',
    name: 'version',
    default: 'patch', // 默认值
    choices: ['beta', 'patch', 'minor', 'major']
  }
]
const updataPkg = function () {
  const pkg = require('../packages/el/package.json')
  const { dependencies, peerDependencies } = require('../package.json')
  fs.writeFileSync(
    path.resolve(__dirname, '../dist', 'package.json'),
    jsonFormat({ ...pkg, dependencies, peerDependencies })
  )
}
inquirer.prompt(promptList).then(answers => {
  let pubVersion = answers.version
  if (pubVersion === 'beta') {
    const { version } = require('../packages/el/package.json')
    let index = version.indexOf('beta')
    if (index != -1) {
      const vArr = version.split('.')
      vArr[vArr.length - 1] = parseInt(vArr[vArr.length - 1]) + 1
      pubVersion = vArr.join('.')
    } else {
      pubVersion = `${version}-beta.0`
    }
  }
  cp.exec(
    `npm version ${pubVersion}`,
    { cwd: path.resolve(__dirname, '../packages/el') },
    function (error, stdout, stderr) {
      if (error) {
        console.log(error)
      }
      updataPkg()
    }
  )
})

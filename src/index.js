#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const ejs = require('ejs')
const chalk = require('chalk')

const defaultDirname = __dirname + '/..'

const dirname = process.cwd() // user root folder
const cLocal = chalk.gray('(local)')

// default templates which provided by anno-cli package
let defaultChoices = fs.readdirSync(`${defaultDirname}/templates`)

// templates which provided locally
let choices = fs.readdirSync(`${dirname}/templates`).map((item) => item + cLocal)

choices.push(...defaultChoices)

const questions = [
  {
    name: 'template',
    type: 'list',
    message: 'What template would you like to generate?',
    choices: choices,
  },
  {
    name: 'path',
    type: 'input',
    message: 'Path:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\/\d])+$/.test(input)) return true
      else return 'folder name may only include letters, numbers, underscores and hashes.'
    },
  },
]

inquirer.prompt(questions).then((answers) => {
  const isLocal = answers.template.indexOf(cLocal) === -1 ? defaultDirname : dirname
  const tmp = answers.template.replace(cLocal, '')
  const templatePath = `${isLocal ? defaultDirname : dirname}/templates/${tmp}`
  const config = require(templatePath + '/config')

  inquirer.prompt(config.prompts).then((cAnswers) => {
    answers = Object.assign(answers, cAnswers)
    let tempDirs = fs.readdirSync(templatePath)
    tempDirs.map((file) => {
      if (file === 'config.js') return

      const stats = fs.statSync(origFilePath)

      if (stats.isFile()) {
        makeDir(CURR_DIR + '/', answers.path)
        const origFilePath = `${templatePath}/${file}`

        // Copy file to destination
        handleSingleFile(origFilePath)
      } else {
        // If it's a folder, we need to judge it whether we need to copy it
        // to other folder according to config
      }

      makeDir(CURR_DIR + config.map[''], answers.projectName)

      //createDirectoryContents(templatePath, answers)
      console.log(tempDirs)
    })
  })
})

function makeDir(parentPath, subPath) {
  const pathArr = subPath.split('/')

  if (pathArr && pathArr.length && pathArr[0]) {
    const folder = pathArr.shift()
    if (folder !== '.') {
      const newPath = parentPath + '/' + folder
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath)
      }
      makeDir(newPath, pathArr.join('/'))
    }
  }
}

function handleSingleFile(orig, writePath, answers) {
  const contents = fs.readFileSync(orig, 'utf8')
  // Apply ejs to file
  // ...

  fs.writeFileSync(writePath, contents, 'utf8')
}

function handleFolder(folder, dest) {}

function createDirectoryContents(templatePath, answers) {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`

    console.log(file)

    // get stats about the current file
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')

      // const writePath = `${CURR_DIR}/${newProjectPath}/${file}`
      // fs.writeFileSync(writePath, contents, 'utf8')
    } else {
      createDirectoryContents(origFilePath, answers)
    }
  })
}

// sudo rm -rf /usr/local/bin/anno-cli

#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const fsp = require('fs-path')
const ejs = require('ejs')
const chalk = require('chalk')

const _DEFAULTROOT = __dirname + '/..'

const _USERROOT = process.cwd() // user root folder
const cLocal = chalk.gray('(local)')

// default templates which provided by anno-cli package
let defaultChoices = fs.readdirSync(`${_DEFAULTROOT}/templates`)

// templates which provided locally
let choices = fs.readdirSync(`${_USERROOT}/templates`).map((item) => item + cLocal)

choices.push(...defaultChoices)

const questions = [
  {
    name: '$template',
    type: 'list',
    message: 'What template would you like to generate?',
    choices: choices,
  },
  {
    name: '$path',
    type: 'input',
    message: 'Path:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\/\d])+$/.test(input)) return true
      else return 'folder name may only include letters, numbers, underscores and hashes.'
    },
  },
]

inquirer.prompt(questions).then((answers) => {
  const isLocal = answers.$template.indexOf(cLocal) === -1 ? _DEFAULTROOT : _USERROOT
  const tmp = answers.$template.replace(cLocal, '')

  const templatePath = `${isLocal ? _DEFAULTROOT : _USERROOT}/templates/${tmp}`
  const config = require(templatePath + '/config')

  inquirer.prompt(config.prompts).then((cAnswers) => {
    answers = Object.assign(answers, cAnswers)
    handleTemplates(templatePath, config, answers)
  })
})

function handleTemplates(templatePath, answers) {
  let tempDirs = fs.readdirSync(templatePath)
  tempDirs.map((file) => {
    if (file === 'config.js') return

    const origFilePath = `${templatePath}/${file}`
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const destPath = `${_USERROOT}/${answers.$path}/${file}`

      // Copy file to destination
      handleSingleFile(origFilePath, destPath, file, answers)
    } else {
      // If it's a folder, we need to judge it whether we need to copy it
      // to other folder according to config
      const replacePath = config.map && config.map[file] ? config.map[file] : file
      const destPath = `${_USERROOT}/${replacePath}/${answers.$path}`

      handleFolder(origFilePath, destPath, answers)
    }
  })
}

function handleSingleFile(orig, dest, file, answers) {
  const contents = fs.readFileSync(orig, 'utf8')
  const writePath = `${dest}/${file}`
  // Apply ejs to file
  // ...
  console.log(orig, writePath)
  fsp.mkdir(dest, () => {
    fs.writeFileSync(writePath, contents, 'utf8')
  })
}

function handleFolder(folder, dest, answers) {
  const filesToCreate = fs.readdirSync(folder)

  filesToCreate.forEach((file) => {
    const origFilePath = `${folder}/${file}`
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      handleSingleFile(origFilePath, dest, file, answers)
    } else {
      const destFilePath = `${dest}/${file}`
      handleFolder(origFilePath, destFilePath, answers)
    }
  })
}

// sudo rm -rf /usr/local/bin/anno-cli

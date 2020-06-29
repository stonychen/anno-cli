#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const ejs = require('ejs')
const CURR_DIR = process.cwd()

//const dirname = __dirname + '/..'
const dirname = CURR_DIR

const CHOICES = fs.readdirSync(`${dirname}/templates`)

const QUESTIONS = [
  {
    name: 'templateChoice',
    type: 'list',
    message: 'What template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'projectName',
    type: 'input',
    message: 'folder name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\/\d])+$/.test(input)) return true
      else return 'folder name may only include letters, numbers, underscores and hashes.'
    },
  },
]

inquirer.prompt(QUESTIONS).then((answers) => {
  const templatePath = `${dirname}/templates/${answers.templateChoice}`
  const config = require(templatePath + '/config')

  inquirer.prompt(config.prompts).then((cAnswers) => {
    answers = Object.assign(answers, cAnswers)

    console.log(answers)
    makeDir(CURR_DIR + '/', answers.projectName)
    //createDirectoryContents(templatePath, answers)
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

function createDirectoryContents(templatePath, answers) {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach((file) => {
    if (file === 'config.js') return

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

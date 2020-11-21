import inquirer = require('inquirer')
import fs = require('fs')
import makeDir = require('make-dir')
import _ejs = require('ejs')
import chalk = require('chalk')

const _DEFAULTROOT = __dirname + '/..'

const _USERROOT = process.cwd() // user root folder
const cLocal = chalk.gray('(local)')

const generateTemplate = () => {
  // default templates which provided by anno-cli package
  let defaultChoices = fs.readdirSync(`${_DEFAULTROOT}/templates`)

  // templates which provided locally
  let choices = fs.readdirSync(`${_USERROOT}/templates`).map((item) => item + cLocal)

  choices.push(...defaultChoices)

  const questions: inquirer.QuestionCollection<any> = [
    {
      name: '$TEMPLATE',
      type: 'list',
      message: 'What template would you like to generate?',
      choices: choices,
    },
    {
      name: '$PATH',
      type: 'input',
      message: 'What path would you like to generate to? path:',
      validate: (input1) => {
        if (/^([A-Za-z\-\_\/\d])+$/.test(input1)) return true
        else return 'Path may only include letters, numbers, underscores and hashes.'
      },
    },
  ]

  inquirer.prompt(questions).then((answers) => {
    const isLocal = (answers.$TEMPLATE as any).indexOf(cLocal) === -1 ? _DEFAULTROOT : _USERROOT
    const tmp = (answers.$TEMPLATE as any).replace(cLocal, '')

    const templatePath = `${isLocal ? _DEFAULTROOT : _USERROOT}/templates/${tmp}`
    const config = require(templatePath + '/config')

    inquirer.prompt(config.prompts).then((cAnswers: any) => {
      answers = Object.assign(answers, cAnswers)
      handleTemplates(templatePath, config, answers)
    })
  })
}

export default generateTemplate



function handleTemplates(templatePath: string, config: any, answers: any) {
  let tempDirs = fs.readdirSync(templatePath)
  tempDirs.map((file) => {
    if (file === 'config.js') return

    const origFilePath = `${templatePath}/${file}`
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const destPath = `${_USERROOT}/${answers.$PATH}/${file}`

      // Copy file to destination
      handleSingleFile(origFilePath, destPath, file, answers)
    } else {
      // If it's a folder, we need to judge it whether we need to copy it
      // to other folder according to config
      const replacePath = config.map && config.map[file] ? config.map[file] : file
      const destPath = `${_USERROOT}/${replacePath}/${answers.$PATH}`

      handleFolder(origFilePath, destPath, answers)
    }
  })
}

function handleSingleFile(orig: string, dest: string, file: string, answers: any) {
  const content = fs.readFileSync(orig, 'utf8')
  const writePath = `${dest}/${file}`

  let newContent = _ejs.render(content, { root: answers })

  console.log(writePath)
  makeDir(dest).then(() => {
    fs.writeFileSync(writePath, newContent, 'utf8')
  })
}

function handleFolder(folder: string, dest: string, answers: any) {
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



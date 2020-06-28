#!/usr/bin/env ts-node --script-mode --transpile-only --files

// import * as fs from 'fs';
// import * as path from 'path';

// const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
// const QUESTIONS = [{
//     name: 'template',
//     type: 'list',
//     message: 'What project template would you like to generate?',
//     choices: CHOICES
//   },
//   {
//     name: 'name',
//     type: 'input',
//     message: 'Project name:'
//   }
// ];

// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
// inquirer.prompt(QUESTIONS)
//   .then(answers => {
//     console.log(answers);
//   });

import chalk from 'chalk'
console.log(chalk.blue('Hello world!'))
console.log('Hello world!')

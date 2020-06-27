#!/usr/bin/env node
// https://github.com/chalk/chalk#readme
// https://nodejs.org/api/readline.html
// https://ejs.co/#docs

const chalk = require('chalk');
const readline = require('readline');
const ejs = require('ejs');

require('./require-tm')
const foo = require("./templates/foo.js.tm");

let people = ['Peter', 'Neil', 'Alex'];
let res = ejs.render(foo, {people: people});
//console.log(chalk.blue('Hello world!'));

console.log(res)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
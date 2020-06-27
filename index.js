require('./require-tm')
const chalk = require('chalk');
const foo = require("./templates/foo.js.tm");

const ejs = require('ejs');

let people = ['Peter', 'Neil', 'Alex'];
let res = ejs.render(foo, {people: people});
//console.log(chalk.blue('Hello world!'));

console.log(res)
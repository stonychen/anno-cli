#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
const makeDir = require('make-dir')
const ejs = require('ejs')
const chalk = require('chalk')
const template = require('./template')

var argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'temp',
    aliases: ['template', 't'],
    desc: 'Generate template',
    handler: (argv) => {
      // We here can pass a template name to skip template selection.
      template()
    },
  })
  .demandCommand()
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2020').argv

// sudo rm -rf /usr/local/bin/anno-cli

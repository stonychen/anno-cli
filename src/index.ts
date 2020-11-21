import generateTemplate from './generate-template'
import yargs = require('yargs')

yargs.usage('Usage: $0 <command> [options]')
  .command({
    command: 'temp',
    aliases: ['template', 't'],
    handler: () => {
      // We here can pass a template name to skip template selection.
      generateTemplate()
    },
  })
  .demandCommand()
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2020').argv

// sudo rm -rf /usr/local/bin/anno-cli

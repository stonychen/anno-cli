"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generate_template_1 = require("./generate-template");
var yargs = require("yargs");
yargs.usage('Usage: $0 <command> [options]')
    .command({
    command: 'temp',
    aliases: ['template', 't'],
    handler: function () {
        // We here can pass a template name to skip template selection.
        generate_template_1.default();
    },
})
    .demandCommand()
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2020').argv;
// sudo rm -rf /usr/local/bin/anno-cli
//# sourceMappingURL=index.js.map
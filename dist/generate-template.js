"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var fs = require("fs");
var makeDir = require("make-dir");
var _ejs = require("ejs");
var chalk = require("chalk");
var _DEFAULTROOT = __dirname + '/..';
var _USERROOT = process.cwd(); // user root folder
var cLocal = chalk.gray('(local)');
var generateTemplate = function () {
    // default templates which provided by anno-cli package
    var defaultChoices = fs.readdirSync(_DEFAULTROOT + "/templates");
    // templates which provided locally
    var choices = fs.readdirSync(_USERROOT + "/templates").map(function (item) { return item + cLocal; });
    choices.push.apply(choices, defaultChoices);
    var questions = [
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
            validate: function (input1) {
                if (/^([A-Za-z\-\_\/\d])+$/.test(input1))
                    return true;
                else
                    return 'Path may only include letters, numbers, underscores and hashes.';
            },
        },
    ];
    inquirer.prompt(questions).then(function (answers) {
        var isLocal = answers.$TEMPLATE.indexOf(cLocal) === -1 ? _DEFAULTROOT : _USERROOT;
        var tmp = answers.$TEMPLATE.replace(cLocal, '');
        var templatePath = (isLocal ? _DEFAULTROOT : _USERROOT) + "/templates/" + tmp;
        var config = require(templatePath + '/config');
        inquirer.prompt(config.prompts).then(function (cAnswers) {
            answers = Object.assign(answers, cAnswers);
            handleTemplates(templatePath, config, answers);
        });
    });
};
exports.default = generateTemplate;
function handleTemplates(templatePath, config, answers) {
    var tempDirs = fs.readdirSync(templatePath);
    tempDirs.map(function (file) {
        if (file === 'config.js')
            return;
        var origFilePath = templatePath + "/" + file;
        var stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
            var destPath = _USERROOT + "/" + answers.$PATH + "/" + file;
            // Copy file to destination
            handleSingleFile(origFilePath, destPath, file, answers);
        }
        else {
            // If it's a folder, we need to judge it whether we need to copy it
            // to other folder according to config
            var replacePath = config.map && config.map[file] ? config.map[file] : file;
            var destPath = _USERROOT + "/" + replacePath + "/" + answers.$PATH;
            handleFolder(origFilePath, destPath, answers);
        }
    });
}
function handleSingleFile(orig, dest, file, answers) {
    var content = fs.readFileSync(orig, 'utf8');
    var writePath = dest + "/" + file;
    var newContent = _ejs.render(content, { root: answers });
    console.log(writePath);
    makeDir(dest).then(function () {
        fs.writeFileSync(writePath, newContent, 'utf8');
    });
}
function handleFolder(folder, dest, answers) {
    var filesToCreate = fs.readdirSync(folder);
    filesToCreate.forEach(function (file) {
        var origFilePath = folder + "/" + file;
        var stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
            handleSingleFile(origFilePath, dest, file, answers);
        }
        else {
            var destFilePath = dest + "/" + file;
            handleFolder(origFilePath, destFilePath, answers);
        }
    });
}
//# sourceMappingURL=generate-template.js.map
'use strict'
const exec = require('child_process').exec
const fs = require('fs')
const config = require('../templates')
const chalk = require('chalk')
const inquirer = require('inquirer')
var figlet = require('figlet');
var checkVersion = require('../lib/check-version');
var installConfig = require('../lib/installConfig.js')
var nowPath = process.cwd();
var ora = require('ora');

var spinner = ora(chalk.green('正在从远程仓库拉取模板...'));

module.exports = () => {
    checkVersion(() => {
        console.log(
            chalk.green(
                figlet.textSync("DTiT CLI")
            ));
        inquirer.prompt(installConfig.type).then(function (args) {
            assignConfig(args)
            //name
            nameInit();
        });
    });
    let configTemp = {}

    function assignConfig(args, last) {
        configTemp = Object.assign(configTemp, args);
        if (last) {
            createrFn();
        }
    }

    function nameInit() {
        inquirer.prompt(installConfig.nameInit).then(function (args) {
            assignConfig(args);
            descInit();
        })
    }

    function descInit() {
        inquirer.prompt(installConfig.descInit).then(function (args) {
            assignConfig(args, true);
        })
    }

    function createrFn() {
        let gitUrl = config.tpl[configTemp.projectType].url
        let branch = config.tpl[configTemp.projectType].branch

        // git命令，远程拉取项目并自定义项目名
        let cmdStr = `git clone ${gitUrl} ${configTemp.projectName} && cd ${configTemp.projectName} && git checkout ${branch}`

        //console.log(chalk.white('\n Start generating...'))
        spinner.start();
        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }
            spinner.stop();
            //修改package.json的项目名称
            updateName();
        });
    }

    function updateName() {
        try {
            if (fs.existsSync(nowPath + '\\' + configTemp.projectName + '/package.json')) {
                const json = JSON.parse(fs.readFileSync(nowPath + '\\' + configTemp.projectName + '/package.json'));
                json.name = configTemp.projectName;
                json.description = configTemp.description;
                fs.writeFileSync(nowPath + '\\' + configTemp.projectName + '/package.json', JSON.stringify(json), 'utf-8');
            } else {
                fs.writeFileSync(nowPath + '\\' + configTemp.projectName + '/package.json', JSON.stringify({
                    name: configTemp.projectName,
                    description: configTemp.description
                }));
            }
        } catch (e) {
            console.log(chalk.red("\n出现异常"))
            console.log(e);
            console.log(chalk.red('\n × Generation failed!'))
            process.exit();
            return;
        }
        try {
            deleteFolder(nowPath + '\\' + configTemp.projectName + '/.git/');
        } catch (e) {
            console.log(chalk.red("\n出现异常"))
            console.log(e);
            console.log(chalk.red('\n × Generation failed!'))
            process.exit();
            return;
        }
        console.log(chalk.green('\n √ Generation completed!'))
        console.log(`\n cd ${configTemp.projectName} && npm install \n`)
        process.exit()
    }

    var deleteFolder = function (path) {
        var files = [];
        try {
            if (fs.existsSync(path)) {
                files = fs.readdirSync(path);
                files.forEach(function (file, index) {
                    var curPath = path + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) { // recurse
                        deleteFolder(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        } catch (e) {
            console.log(path + " not found");
        }
    };
}
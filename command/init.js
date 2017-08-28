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

        console.log(chalk.white('\n Start generating...'))

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }
            //修改package.json的项目名称
            updateName();
            process.exit()
        })
    }

    function updateName() {
        try {
            const json = JSON.parse(fs.readFileSync(nowPath + '\\' + configTemp.projectName + '/package.json'));
            json.name = configTemp.projectName;
            json.description = configTemp.description;
            fs.writeFile(nowPath + '\\' + configTemp.projectName + '/package.json', JSON.stringify(config), 'utf-8', (err) => {
                if (err) console.log(err)
                fs.console.log(chalk.green('\n √ Generation completed!'))
                console.log(`\n cd ${configTemp.projectName} && npm install \n`)
                process.exit()
            })
        } catch (e) {
            console.log(chalk.green('\n √ Generation completed!'))
            console.log(`\n cd ${configTemp.projectName} && npm install \n`)
            process.exit();
        }
    }
}
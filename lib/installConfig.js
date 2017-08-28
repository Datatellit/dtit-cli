var chalk = require('chalk');
var inquirer = require('inquirer');
const config = require('../templates')

let types = [];
for (let key in config.tpl) {
    types.push(key);
}

let type = [
    {
        name: 'projectType',
        type: 'list',
        message: '选择项目类型： ',
        choices: types
    }
];
let nameInit = [
    {
        name: 'projectName',
        type: 'input',
        message: '输入项目名' + chalk.gray('(例: Dtit-xxx-xxx)： '),
        validate(value) {
            if (value.length) {
                return true;
            } else {
                return '请输入您项目的名称：';
            }
        }
    }
];
let descInit = [
    {
        name: 'description',
        type: 'input',
        message: '输入项目描述： ',
        validate(value) {
            if (value.length) {
                return true;
            } else {
                return '请输入您项目的描述：';
            }
        }
    }
];

module.exports = {
    nameInit: nameInit,
    type: type,
    descInit: descInit
}

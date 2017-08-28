'use strict'
const config = require('../templates')

module.exports = () => {
    for (var key in config.tpl)
        console.log(key)
    process.exit()
}
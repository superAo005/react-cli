'use strict'
const gradient = require('gradient-string')
const ConsoleLog = require('../src/utils/console')
const gitUrl = require('../src/utils/gitUrl')
const ConsoleFoot = () => {
  ConsoleLog(gradient.cristal('  cli: https://github.com/superAo005/react-cli') + '\n')
  ConsoleLog(gradient.rainbow(`模版地址: https://github.com/superAo005/react-vite ') + '\n'`)
}

module.exports = ConsoleFoot

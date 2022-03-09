'use strict'
const gradient = require('gradient-string')
const ConsoleLog = require('../src/utils/console')

const ConsoleFoot = () => {
  ConsoleLog(gradient.cristal('  home: https://github.com/superAo005/react-cli') + '\n')
  ConsoleLog(gradient.rainbow('  cli 拉取需要github权限，请先确保登陆') + '\n')
}

module.exports = ConsoleFoot

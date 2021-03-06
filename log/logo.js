'use strict'
const gradient = require('gradient-string')
const figlet = require('figlet')
const ConsoleLog = require('../src/utils/console')

const logo = () =>
  new Promise((resolve, reject) => {
    figlet.text(
      'REACT !',
      {
        font: 'Standard',
        kerning: 'full',
      },
      function (err, data) {
        if (err) {
          ConsoleLog('Something went wrong...', err)
          return
        }
        ConsoleLog(gradient.pastel.multiline(data) + '\n')
        ConsoleLog(gradient.atlas('  Welcome to use the react-cli!') + '\n')
        resolve(true)
      }
    )
  })

module.exports = logo

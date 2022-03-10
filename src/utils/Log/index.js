'use strict'
const gradient = require('gradient-string')
const ConsoleLog = require('../console')
const strarr = [
  {
    style: 'morning',
    value: '',
  },
]

const body = (str) => {
  strarr[0].value = str
  for (const t of strarr) {
    ConsoleLog(gradient[t.style](t.value) + '\n')
  }
}

module.exports = body

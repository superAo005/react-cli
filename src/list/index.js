/**
 * @Author superAo
 * @Date 2022/3/9
 * @Version 1.0.0
 * @Last Modified by superAo
 * @Last Modified Time 2022/10/13
 */

// const co = require('co')
let chalk = require('chalk')
const logo = require('../../Log/logo')
const footer = require('../../Log/footer')
const body = require('../utils/Log')
const promiseGetTag = require('../utils/brachList')
const list = async () => {
  let boolean = await logo()
  if (boolean) {
    //console身体
    body('  It displays a list of existing authoring templates.')
    //console底部
    footer()
    promiseGetTag().then((tags) => {
      console.log('  ' + chalk.yellow('★ 已有模板： \n '))
      tags.map((key) => {
        console.log('  ' + chalk.green('★') + '  ' + chalk.green(key))
      })
    })
  }
}
module.exports = list

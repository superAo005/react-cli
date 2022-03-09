#!/usr/bin/env node --harmony
/**
 * @Author superAo
 * @Date 2022/3/9
 * @Version 1.0.0
 * @Last Modified by superAo
 * @Last Modified Time 2022/3/9
 */
'use strict'
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

// 定义当前版本
program.version(require('../package.json').version)

// 定义使用方法
program.usage('<command>')

program
  .command('init')
  .description('初始化一个 react 产品的模板')
  .alias('i')
  .action(() => {
    require('../src/init/index')()
  })

program
  .command('list')
  .description('查看目前已有模板')
  .alias('l')
  .action(() => {
    require('../src/list/index')()
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}

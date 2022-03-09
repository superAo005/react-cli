#!/usr/bin/env node --harmony
/**
 * @Author zhiyuan.xu
 * @Date 2021/5/28
 * @Version 1.0.0
 * @Last Modified by zhiyuan.xu
 * @Last Modified Time 2021/5/28
 */
'use strict';
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';


const program = require('commander');

// 定义当前版本
program
    .version(require('../package.json').version )


// 定义使用方法
program
    .usage('<command>');

program
    .command('eject')
    .description('将nfes项目转换成nmf项目（实验项目）')
    .alias('e')
    .action(() => {
        require('../src/eject/index')()
    });

program
    .command('init')
    .description('初始化一个 NFES 产品的模板')
    .alias('i')
    .action(() => {
        require('../src/init/index')()
    });

program
    .command('list')
    .description('查看目前已有模板')
    .alias('l')
    .action(() => {
        require('../src/list/index')()
    });


program.parse(process.argv);

if(!program.args.length){
    program.help()
}

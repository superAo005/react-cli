/**
 * @Author zhiyuan.xu
 * @Date 2021/5/28
 * @Version 1.0.0
 * @Last Modified by zhiyuan.xu
 * @Last Modified Time 2021/5/28
 */

const co = require('co');
let chalk = require('chalk');
const logo = require('../../Log/logo');
const footer = require('../../Log/footer');
const body = require('../utils/Log');
const promiseGetTag = require('../utils/brachList');
module.exports = function(){
    co(function *(){
        let boolean = logo();
        if (yield boolean){
            //console身体
            body('  It displays a list of existing authoring templates.');
            //console底部
            footer();
            promiseGetTag().then((tags) => {
                console.log(
                    '  ' + chalk.yellow('★ 已有模板： \n ')
                )
                tags.map((key) => {
                    console.log(
                        '  ' + chalk.green('★') +
                        '  ' + chalk.green(key)
                    )
                })
            })
        }
    });
};

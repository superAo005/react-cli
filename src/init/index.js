/**
 * @Author superAo
 * @Date 2022/3/9
 * @Version 1.0.0
 * @Last Modified by superAo
 * @Last Modified Time 2022/3/9
 */
'use strict';
const exec = require('child_process').exec;
const co = require('co');
const fs = require('fs')
const chalk = require('chalk');
const deleteFolderRecursive = require('../utils/deleteFolder');
const promiseGetTag = require('../utils/brachList');
const inquirer = require('inquirer');
const logo = require('../../Log/logo');
const footer = require('../../Log/footer');
const body = require('../utils/Log');
const gitUrl = require('../utils/gitUrl')



module.exports = () => {
    co(function *() {
        //设置写入的字体
        let boolean = logo();
        //异步在选择完成后执行
        if (yield boolean){
            //console身体
            body('  Choose a template that belongs to yourself, then initiate a routine');
            //console底部
            footer();
            //选择自己的模板 ;
            const firstQuestion = {
                type: 'input',
                name: 'name',
                message: "项目的名称(限英文,唯一id)"
            };

            let secondQuestion = {};
            promiseGetTag().then((tags) => {
                secondQuestion = {
                    type: 'list',
                    message: '选择您的模板?',
                    name: 'line',
                    choices: [...tags],
                }

                inquirer.prompt([
                    firstQuestion,
                    secondQuestion,
                ]).then(function (answers) {
                    let flag = Object.keys(answers).some((key) => {
                        return answers[key].trim() === ''
                    })
                    if (flag) {
                        console.log(chalk.red('\n × 相关信息必填 !'));
                        process.exit()
                    }
                    console.log(chalk.yellow('\n Start generating...'));

                    // git命令，远程拉取项目并自定义项目名
                    let projectName = answers.name.toLowerCase();
                    const clone =  exec(`git clone --progress ${gitUrl} ${projectName}`,(error, stdout, stderr)=>{
                        if (error) {
                            console.log(error);
                            process.exit()
                        }+
                            exec(`cd ${projectName} && git checkout origin/${answers.line}`, (error2, stdout2, stderr2) => {
                                if (error2) {
                                    console.log(error2);
                                    process.exit()
                                }
                                // 删除 git 文件
                                deleteFolderRecursive(process.cwd()+`/${projectName}/.git`);
                                let packageJson = fs.readFileSync(`${process.cwd()}/${projectName}/package.json`, 'utf-8');
                                const copyData = JSON.parse(packageJson);
                                copyData.name = projectName;
                                fs.writeFileSync(`${process.cwd()}/${projectName}/package.json`, JSON.stringify(copyData, null, 4), {
                                    encoding: 'utf8',
                                });
                                console.log(chalk.green('\n √ 初始化成功!'));
                                console.log(`\n cd ${projectName} && npm install && npm run dev \n`);
                                process.exit()
                            })
                    });
                    clone.stderr.on('data', function(data){
                        if (data.indexOf('Receiving objects') >= 0){
                            console.log(chalk.yellow(`\n The current progress is'${data.replace('Receiving objects','')}`));
                        }
                    });
                })
            })
        }

    })

}


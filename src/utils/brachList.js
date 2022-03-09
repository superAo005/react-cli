/**
 * @Author superAo
 * @Date 2022/3/9
 * @Version 1.0.0
 * @Last Modified by superAo
 * @Last Modified Time 2022/3/9
 */
const gitUrl = require('./gitUrl')
const exec = require('child_process').exec;

const promiseGetTag = () => {
    return new Promise((resolve, reject) => {
        const clone =  exec(`git ls-remote --heads ${gitUrl}`,(error, stdout, stderr)=>{
            if (error) {
                reject();
                process.exit()
            }
            const temeplateList = ['react_CSR', 'react_CSR_With_Antd_Admin', 'react_CSR_With_Router', 'react_CSR_With_Qiankun', 'react_CSR_With_Module_Federation', 'react_CSR_With_Module_Federation_Admin', 'react_SSR_Hello_react', 'react_SSR_With_Typescript', 'react_SSR_With_ANTD', 'react_CSR_Plugin']
            let tags = stdout.split('\n').map((item) => {
                const headData = item.split('/');
                return  headData[headData.length - 1];
            }).filter((data) => data && temeplateList.includes(data))
            resolve(tags);
        })
        clone.stderr.on('data', function(data){
            if (data.indexOf('Receiving objects') >= 0){
                console.log(chalk.yellow(`\n The current progress is'${data.replace('Receiving objects','')}`));
            }
        });
    })
}

module.exports = promiseGetTag;

/**
 * @Author zhiyuan.xu
 * @Date 2021/3/29
 * @Version 1.0.0
 * @Last Modified by zhiyuan.xu
 * @Last Modified Time 2021/3/29
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
            const temeplateList = ['NFES_CSR', 'NFES_CSR_With_Antd_Admin', 'NFES_CSR_With_Router', 'NFES_CSR_With_Qiankun', 'NFES_CSR_With_Module_Federation', 'NFES_CSR_With_Module_Federation_Admin', 'NFES_SSR_Hello_NFES', 'NFES_SSR_With_Typescript', 'NFES_SSR_With_ANTD', 'NFES_CSR_Plugin']
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

/**
 * @Author zhiyuan.xu
 * @Date 2021/10/28
 * @Version 1.0.0
 * @Last Modified by zhiyuan.xu
 * @Last Modified Time 2021/10/28
 */

const co = require('co');
let chalk = require('chalk');
const fs = require('fs');
const logo = require('../../Log/logo');
const body = require('../utils/Log');
const footer = require('../../Log/footer');
const {isFileExist, mkdir, writeFile, readFileSync, deleteFile, copyFile, renameSync} = require('../utils/fsutil')
const path = require('path');
const deleteFolderRecursive = require('../utils/deleteFolder/index')
module.exports = function() {
    co(function* () {
        let boolean = logo();
        const cwd = process.cwd();
        if (yield boolean){
            body('  nfes项目转换.');
            footer();
            const srcPath = path.join(cwd, './src');

            const mkdirHandle = () => {
                if (!isFileExist(srcPath)) {
                    mkdir(srcPath);
                }
                console.log(chalk.green('√ 创建src目录...'))
            }

            const deleteNext = () => {
                deleteFolderRecursive(path.join(cwd, './.next'))
                console.log(chalk.green('√ 删除nfes缓存目录...'))
            }

            const updatePackage = () => {
                const pData = require(path.join(cwd, './package.json'));
                const obj = {
                    test: "nfes-nmf test NODEENV=Test coverage=true",
                    dev: "nfes-nmf start NODE_ENV=development NOOPEN=1",
                    build: "nfes-nmf build NODE_ENV=production",
                    onlinebuild: "nfes-nmf onlinebuild NODE_ENV=production"
                }
                Object.keys((pData.scripts)).map((key) => {
                    if (pData.scripts[key]) {
                        pData.scripts[key] = obj[key]
                    } else {
                        delete pData.scripts[key];
                    }
                })
                Object.keys(pData.dependencies).map((key) => {
                    if (key === '@ctrip/nfes') {
                        delete pData.dependencies[key];
                    }
                    pData.dependencies['@ctrip/nfes-nmf'] = "^4.1.27"
                })
                writeFile(path.join(cwd, './package.json'), JSON.stringify(pData, null, 4));
                console.log(chalk.green('√ 更新 package.json...'))
            }

            const updateNfesConfig = () => {
                const nfesConfigPath = path.join(cwd, './nfes.config.js');
                const nfesConfig = require(nfesConfigPath);
                delete nfesConfig.vd;
                delete nfesConfig.main;
                delete nfesConfig.buildId;
                delete nfesConfig.redisName;
                delete nfesConfig.htmlCacheTime;
                delete nfesConfig.excludeCache;
                nfesConfig.useRouter = true;
                nfesConfig.sass = true;
                nfesConfig.less = true;
                nfesConfig.captainOptions = {
                    "appid":"00000000",
                    "site": ['webresource.c-ctrip.com', 'webresource.english.c-ctrip.com', 'ares.i18n', 'offline'][0],
                    "resVD":"demo",   //特征码：如业务方相关的ticketxxx,flightxxx等
                    "noticeUserID":["S45066"]
                }
                writeFile(nfesConfigPath, `module.exports = {
///<!--表达式生成区域请勿修改注释-->
// cdn-start

// cdn-end  
// vd-start
vd:"",
// vd-end
///<!--表达式生成区域请勿修改注释-->
${Object.keys(nfesConfig).map((key) => (key + ":" + JSON.stringify(nfesConfig[key], null, 4) + "," )).join('\n')}
}`);
                console.log(chalk.green('√ 更新 nfesConfig...'))
            }

            const updateDocument = () => {
                const documentPath = path.join(cwd, './pages/_document.js');
                const obj = {};
                if (isFileExist(documentPath)) {
                    const documentContext = readFileSync(documentPath);
                    const headerContent = documentContext.match(/(?<=<Head>)((.|\n)*)(?=.<\/Head>)/g)
                    console.log('--', headerContent)
                    if (headerContent && headerContent.length > 0) {
                        const niceHeaderContent = headerContent[0].split('\n').filter((item) => {
                            return item && (item.trim().startsWith('<') && item.trim().endsWith('/>'))
                        })
                        obj.head = niceHeaderContent.join('\n');
                    }
                    const footerContent = documentContext.match(/(?<=<body)((.|\n)*)(?=.<\/body>)/g)
                    console.log('--12321', footerContent)
                    if (footerContent && footerContent.length > 0) {
                        const niceFooterContent = footerContent[0].split('\n').filter((item) => {
                            return item && item.indexOf('<script>') >= 0
                        })
                        obj.footer = `<script>console.log('nmf is running ...')</script> \n ${niceFooterContent.join('\n')}`;
                    }
                    writeFile(path.join(cwd, './src/_document.js'),`module.exports = {
                        head: \`${obj.head}\`,
                        footer: \`${obj.footer || ""}\`
                    }`);
                    deleteFile(documentPath)
                } else {
                    console.log(chalk.red('没有发现 ./pages/_document.js'))
                }
            }

            const makeIndex = () => {
                const tempIndexPath = path.join(__dirname, "./temp", "index.js");
                const IndexPath = path.join(cwd, './src/index.js');
                const tempLayoute = path.join(__dirname, "./temp", "layout.js");
                const layoute = path.join(cwd, './src/layout.js')
                console.log('---', isFileExist(IndexPath), IndexPath)
                if (!isFileExist(IndexPath)) {
                    copyFile(tempIndexPath, IndexPath);
                }
                if (!isFileExist(layoute)) {
                    copyFile(tempLayoute, layoute);
                }
            }

            const moveFold = () => {
                const stylePath = path.join(cwd, './pages/style');
                const srcStylePath = path.join(cwd, './src/style');
                const pagePath = path.join(cwd, './pages');
                // 替换 style 标签
                const mapFileAndRepleace = (filePath) => {
                    const files = fs.readdirSync(filePath);
                    //遍历读取到的文件列表
                    files.forEach(function(filename){
                        //获取当前文件的绝对路径
                        let filedir = path.join(filePath, filename);
                        //根据文件路径获取文件信息，返回一个fs.Stats对象
                        const stats = fs.statSync(filedir);
                        let isFile = stats.isFile();//是文件
                        let isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(chalk.green(`正在读取 --> ${filedir}`));
                            const reg = /<style.*?\/>/gm;
                            // 读取文件内容
                            let content = fs.readFileSync(filedir, 'utf-8');
                            if (reg.test(content)) {
                                content = content.replace(reg, '')
                                writeFile(filedir, content)
                                console.log(chalk.green(`替换成功！`));
                            }
                        }
                        if(isDir){
                            mapFileAndRepleace(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    });
                }

                mapFileAndRepleace(pagePath);
                const srcPagePath = path.join(cwd, './src/pages');
                if (isFileExist(stylePath)) {
                    renameSync(stylePath, srcStylePath);
                }
                if (isFileExist(pagePath)) {
                    renameSync(pagePath, srcPagePath);
                }
            }

            const moveData = () => {
                const indexPath = path.join(cwd, './index.js')
                const index_express =  path.join(cwd, './index_express.js')
                const jestConfig =  path.join(cwd, './jest.config.js')
                const babelrcPath =  path.join(cwd, './.babelrc.js');
                if (isFileExist(indexPath)) {
                    deleteFile(indexPath)
                }
                if (isFileExist(index_express)) {
                    deleteFile(index_express)
                }
                if (isFileExist(babelrcPath)) {
                    deleteFile(babelrcPath)
                }
                if (isFileExist(jestConfig)) {
                    deleteFile(jestConfig)
                }
                const tempServer = path.join(__dirname, "./temp", "server.js");
                const localSever = path.join(__dirname, "./temp", "local.js");
                if (!isFileExist(path.join(cwd, './server.js'))) {
                    copyFile(tempServer, path.join(cwd, './server.js'));
                }
                if (!isFileExist(path.join(cwd, './local.js'))) {
                    copyFile(localSever, path.join(cwd, './local.js'));
                }
            }

            // 新建 src目录
            mkdirHandle();
            // 删除 .next
            deleteNext();
            // package.json 删除 @ctrip/nfes, 并且添加nmf
            updatePackage();
            // nfes.config.js 的vd 删除。main删除 。 buildId删除， redisName 删除。
            // htmlCacheTime 删除 excludeCache 删除，新增 useRouter、sass、less, captainOptions
            updateNfesConfig();
            // 移出document.js 至src ,读取并且 吧 Head 的东西提取出来
            updateDocument();
            // 新建 index.js
            makeIndex();
            // style 目录移出 到 src,  pages 移入 src 目录
            moveFold()
            // 处理根目录
            moveData();
        }
    })
}

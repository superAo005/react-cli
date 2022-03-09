'use strict';
const gradient = require('gradient-string');
const ConsoleLog = require('../src/utils/console');

const ConsoleFoot = ()=>{
    ConsoleLog(gradient.cristal('  home: http://git.dev.sh.ctripcorp.com/mcjs/nfes-nmf-cli') + '\n');
    ConsoleLog(gradient.rainbow('  cli 拉取需要gitLab权限，请先确保登陆') + '\n');
};

module.exports = ConsoleFoot;

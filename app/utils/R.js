const shell = require('shelljs');

function R(Rpath,config) {
    const result = shell.exec('pwd')
    return result 
}

module.exports = R
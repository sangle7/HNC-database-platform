const shell = require('shelljs');

function R(Rpath,config) {
    const pwd = shell.pwd()
    const result = shell.exec(`Rscript ${pwd}/script/${Rpath} ${config}`)
    return result 
}

module.exports = R
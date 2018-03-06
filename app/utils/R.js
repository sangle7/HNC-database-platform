const shell = require('shelljs');

function R(Rpath,config) {
    const result = shell.exec(`Rscript ${Rpath} ${config}`)
    return result 
}

module.exports = R
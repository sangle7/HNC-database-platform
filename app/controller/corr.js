const R = require('../utils/R');
const md5 = require('md5');
const path = require('path')
var csv = require("fast-csv");
const fs = require('fs')

exports.init = async ctx => {
    const app = ctx.app
    let body = {
        ret: 500,
    }

    const {
        names
    } = ctx.request.body
    try {
        /*names长度决定1v1 or 1vn */
        const [name1, name2] = names
        let newlist = []
        if (name2) {
            /*1v1 */
            const md5String = md5(name1 + name2)
            const filepath = path.join(__dirname, '..', 'public', 'corr', `${md5String}.1v1.table.csv`)
            const isExist = fs.existsSync(filepath)
            if (isExist) {
                newlist = await promiseCSV(filepath,{headers:true})
            } else {
                const rResult = R(`corr.1v1.R`, `${app.config.Rpath}/coding.matrix.adj.txt ${app.config.Rpath}/lncRNA.matrix.adj.txt ${name1} ${name2} ${md5String}`)
                if (rResult.code === 0) {
                    // 读取文件内容
                    newlist = await promiseCSV(filepath,{headers:true})
                } else {
                    console.log(rResult.stderr) //错误日志
                }
            }
        } else {
            /*1vn */
        }
        body = {
            list: newlist,
            ret: 200,
        }


    } catch (error) {
        console.log('error:'+error)
        body.error = error
    }
    ctx.body = body
}


function promiseCSV(path, options) {
    return new Promise(function (resolve, reject) {
            var records = [];
            csv.fromPath(path, options)
                .on('data', function (record) {
                    for(let key in record){
                        if(key){
                            record[key] = parseFloat(record[key])
                        }
                    }
                    records.push(record);
                })
                .on('end', function () {
                    resolve(records);
                });
        });
}
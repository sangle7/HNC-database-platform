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
    // validate
    if (await validate(names)) {
      let newList = []
      if (name2) {
        /*1v1 */
        const md5String = md5(name1 + name2)
        const filePath = path.join(__dirname, '..', 'public', 'corr', `${md5String}.1v1.table.csv`)
        const isExist = fs.existsSync(filePath)
        if (isExist) {
          newList = await promiseCSV(filePath, {
            headers: true
          })
        } else {   
          const rResult = R(`corr.1v1.R`, `${path.join(__dirname, '..', 'public', 'coding.matrix.adj.txt')} ${path.join(__dirname, '..', 'public', 'lncRNA.matrix.adj.txt')} ${name1} ${name2} ${md5String}`)
          if (rResult.code === 0) {
            // 读取文件内容
            newList = await promiseCSV(filePath, {
              headers: true
            })
          } else {
            console.log(rResult.stderr) //错误日志
          }
        }
        body = {
          type: 2,
          list: newList,
          ret: 200,
        }
      } else {
        /*1vn */
        const md5String = md5(name1)
        const filePath = path.join(__dirname, '..', 'public', 'corr', `${md5String}.1vn.table.csv`)
        const isExist = fs.existsSync(filePath)
        if (isExist) {
          newList = await promiseCSV(filePath, {
            headers: true
          })
        } else {
          const rResult = R(`corr.1vn.R`, `app/public/coding.matrix.adj.txt app/public/lncRNA.matrix.adj.txt ${name1} ${md5String}`)
          if (rResult.code === 0) {
            // 读取文件内容
            newList = await promiseCSV(filePath, {
              headers: true
            })
          } else {
            console.log(rResult.stderr) //错误日志
          }
        }
        body = {
          type: 1,
          list: newList,
          ret: 200,
        }
      }
    } else {
      body = {
        msg: 'Please enter the correct gene name !',
        ret: 400,
      }
    }
  } catch (error) {
    console.log('error:' + error)
    body.error = error
  }
  ctx.body = body

  async function validate(names){
    for (let item of names){
      const result = await ctx.service.genename.get(item)   
      if(!result){
        return false
      }
    }
    return true
  }
}


function promiseCSV(path, options) {
  return new Promise(function (resolve, reject) {
    var records = [];
    csv.fromPath(path, options)
      .on('data', function (record) {
        for (let key in record) {
          if (key) {
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

const R = require('../utils/R');
const md5 = require('md5');
const path = require('path')
var csv = require("fast-csv");
const fs = require('fs')

exports.dataset = async ctx => {
  let body = {
    ret: 500,
  }

  const list  = await ctx.service.hnclinc.getAllDataset()

  try {
    body = {
      options: list.map(e=>e.DatasetID),
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body

}

exports.init = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    names,checked
  } = ctx.request.body
  const list = await ctx.service.hnclinc.getAllDataset()

  var colnames = []
  if(checked.length !== list.length){
    for(let i = 0;i< checked.length;i++){
      var samplelist = await ctx.service.hnclinc.getSampleByDataset(checked[i])
      var arr = samplelist.map(e=>e.SampleID)
      colnames = [...colnames,...arr]
    }
  }

  const colstr = checked.join(',')

  try {
    /*names长度决定1v1 or 1vn */
    const [name1, name2] = names
    // validate
    if (name1 && name2 && await validate(names)) {
      let newList = []
      if (name2) {
        /*1v1 */
        const md5String = md5(name1 + name2 + colstr)
        const filePath = path.join(__dirname, '..', 'public', 'corr', `${md5String}.1v1.table.csv`)
        const isExist = fs.existsSync(filePath)
        if (isExist) {
          newList = await promiseCSV(filePath, {
            headers: true
          })
        } else {   
          const rResult = R(`corr.1v1.R`, `${path.join(__dirname, '..', 'public', 'test.matrix.adj.txt')} ${path.join(__dirname, '..', 'public', 'test.matrix.adj.txt')} ${name1} ${name2} ${md5String} ${path.join(__dirname, '..', 'public', 'dataset2sample.csv')} ${colstr}`)
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
      } /* else {
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
      } */
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

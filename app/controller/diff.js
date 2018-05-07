const R = require('../utils/R');
const fs = require('fs')
const path = require('path');
const md5 = require('md5');
var csv = require("fast-csv");

exports.init = async ctx => {
    const app = ctx.app
    let body = {
        ret: 500,
    }

    let list = []

    const {
        type,
        genetype,
    } = ctx.request.body

    try{
        //先获取所有文件列表
        const filePath = path.join(__dirname,'..','public','diff');
        const files = fs.readdirSync(filePath)
        list = files.filter(elem=>{
            const newReg = new RegExp(type,'gim')
            const newReg1 = new RegExp(genetype,'gim')
            return newReg.test(elem) && newReg1.test(elem)
        })
    

    } catch (error) {
        body.error = error
    } 

    body.list = list
/*     try {
        const {
            colnames1,
            colnames2
        } = await ctx.service.hnclinc.filterByType(`i${type}`)
        const str1 = colnames1.join(','),
            str2 = colnames2.join(',')
        const md5String = md5(str1 + str2) //这里按照select的选项判断md5？还是按照columnname吧 数据库可能会改
        const rResult = R(`diff.analysis.R`, `${app.config.Rpath}/${genetype}.matrix.adj.txt ${str1} ${str2} ${md5String}`)
        if (rResult.code === 0) {
            console.log(rResult.code) //状态码
        } else {
            console.log(rResult.stderr) //错误日志
        }
        body = {
            list: [{
                id: '12321'
            }],
            str1,
            str2,
            md5String,
            step: 9,
            ret: 200,
        }
    } catch (error) {
        body.error = error
    } */
    
    ctx.body = body
}

exports.table = async ctx =>{
    const app = ctx.app
    let body = {
        ret: 500,
    }
    let list = []

    const {
        tablename
    } = ctx.request.body

    const filePath = path.join(__dirname,'..','public','table',tablename);
    list = await promiseCSV(filePath, {
        headers: true
    })

    body.list = list

    ctx.body = body
}

exports.boxplot = async ctx =>{
    const app = ctx.app
    let body = {
        ret: 500,
    }
    const list = [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
    ]

    body.list = list

    ctx.body = body
}

function promiseCSV(path, options) {
    return new Promise(function (resolve, reject) {
      var records = [];
      csv.fromPath(path, options)
        .on('data', function (record) {
          records.push(record);
        })
        .on('end', function () {
          resolve(records);
        });
    });
  }
  
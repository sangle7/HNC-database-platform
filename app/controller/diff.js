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
    ctx.body = body
}

exports.table = async ctx =>{
    const app = ctx.app
    let body = {
        ret: 500,
    }
    let temp = {
        list: []
    }

    const {
        pagination = {},
        geneId,
        genename,
        name //GSE21866_Tumor_vs_Normal_coding
    } = ctx.request.body

    const { current = 1 } = pagination

    if (genename) {
        const {
            caseId,
        } = arrangeName(name)
        temp = await ctx.service.difftable.searchByGene({
            gene: genename,
            type,
            caseId
        })
    }else if (geneId) {
        temp = await ctx.service.difftable.getByGene({
            geneId
        })
    } else {

        const {
            caseId,
            geneType,
            type
        } = arrangeName(name)

        temp = await ctx.service.difftable.getByCase({
            caseId,
            type,
            geneType,
            page: current
        })
    }

    body.list = temp.list
    body.pagination = genename ? false : {
        page: current,
        total: temp.total
    }

    ctx.body = body
}

exports.boxplot = async ctx =>{
    const app = ctx.app
    let body = {
        ret: 500,
    }

    const {
        gene,
        p,
        adjp,
        title, //GSE1722_Tumor_vs_Normal_coding
    } = ctx.request.body

    const { caseId, geneType, type } = arrangeName(title)
    
    const { boxplot1, boxplot2 } = await ctx.service.submartix.getBoxPlot({
        caseId, 
        type,
        geneType, 
        gene
    })

    const list1 = Object.values(boxplot1).slice(1)
    const list2 = Object.values(boxplot2).slice(1)

    body = {
        list:[list1,list2],
        p,
        adjp
    }

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

  function arrangeName (name) {
    const arr = name.split('_')
    const caseId = arr[0]
    const geneType = arr[arr.length-1]

    arr.pop()
    arr.shift()

    const type = arr.join('@')
    return {
        caseId,geneType,type
    }
}

  
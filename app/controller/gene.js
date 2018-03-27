const R = require('../utils/R');
const path = require('path')
const fs = require('fs')
const md5 = require('md5');
var csv = require("fast-csv");

exports.info = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    page,
    q,
    download
  } = ctx.request.body

  let downloadURL = null

  try {
    if (q) {
      const {
        list,
        total
      } = await ctx.service.gene.search(q)
      /*惊 这里居然没做分页*/
      if(download === true){
        downloadURL = writeToCSV(q,list)
      }

      body = {
        list,
        ret: 200,
        downloadURL,
        pagination: {
          current: page ? parseInt(page) : 1,
          total,
        }
      }
    } else {
      const {
        geneIds,
        total
      } = download === true ? await ctx.service.hncgene.getAll() : await ctx.service.hncgene.query(page ? parseInt(page) : 1)
      const list = []
      for (let elem of geneIds) {
        const {
          item
        } = await ctx.service.gene.getItemById(elem.gene_id)
        list.push(item)
      }

      if(download === true){
        downloadURL = writeToCSV('',list)
      }

      body = {
        list,
        ret: 200,
        downloadURL,
        pagination: {
          current: page ? parseInt(page) : 1,
          total,
        }
      }
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

function writeToCSV (q,list) {
  csv.writeToPath(`app/public/gene-${q}.csv`, list, {headers: true})
    .on("finish", function(){
        console.log("done!");
  });
  return `/public/gene-${q}.csv`
}

exports.heatmap = async ctx => {
  let body = {
    ret: 500,
  }

  const { offset = 0, sorter = {}, filter = '' } = ctx.request.body

  try {
    const { list,total, filtedtotal } = await ctx.service.heatmap.getByPagi({
      offset, 
      size:20,
      sorter,
      filter
    })
    body = {
      list,
      total,
      sorter,
      filter,
      filtedtotal,
      reset: offset === 0,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.init = async ctx => {
  const app = ctx.app
  let body = {
    ret: 500,
  }

  const {
    geneId,
    step = '0',
    type
  } = ctx.request.body
  try {
    switch (step) {
      case '0':
        var {
          item
        } = await ctx.service.gene.getIdByName(geneId)
        body = {
          item,
          step: 0,
          ret: 200,
        }
        break
      case '1':
        // 获取基因在gene表中的id
        var {
          item
        } = await ctx.service.gene.getIdByName(geneId)
        // 根据基因id查找在hncgene表中的hncGeneId
        var {
          hncGeneId
        } = await ctx.service.hncgene.getIdByGeneId(item.id)
        // 根据hncGeneId查找在gene2pubmed表中的数据
        var {
          list
        } = await ctx.service.gene2pubmed.query(hncGeneId)
        for (let elem of list) {
          // 在pubmed表中查询pmid
          var {
            result
          } = await ctx.service.pubmed.getById(elem.pubmed_id)
          elem.pmid = result.pmid
        }
        body = {
          list,
          step: 1,
          ret: 200,
        }
        break
      case '2':
        // 获取基因在gene表中的id
        var {
          item
        } = await ctx.service.gene.getIdByName(geneId)
        // 根据基因id查找在hncgene表中的hncGeneId
        var {
          hncGeneId
        } = await ctx.service.hncgene.getIdByGeneId(item.id)
        var {
          list
        } = await ctx.service.gene2pubmed.query(hncGeneId)
        let newlist = []
        for (let elem of list) {
          var {
            result
          } = await ctx.service.pubmed.getById(elem.pubmed_id)
          var obj1 = await ctx.service.drug2pubmed.query(elem.pubmed_id)
          let _list = []
          for (let item of obj1.list) {
            // 这里获得药名,两步 先查获取dbid 再查durgbank
            const drugid = item.hncdrug_id
            const {
              dbid
            } = await ctx.service.hncdrug.queryById(drugid)
            const {
              drug
            } = await ctx.service.drugbank.queryById(dbid)
            _list = [..._list, { ...item,
              pmid: result.pmid,
              name: drug.name
            }]
          }
          //_list 中每个pmid都为result.pmid
          newlist = [...newlist, ..._list]
        }
        body = {
          list: newlist,
          step: 2,
          ret: 200,
        }
        break
      case '3':
          try {
            let newlist = []
            const filepath = path.join(__dirname,'..','public','expression',`${geneId}expression.table.txt`)
            const isExist = fs.existsSync(filepath)
            if(isExist){
              newlist = read(filepath)
            }else{
              const rResult = R(`expression.R`, `${app.config.Rpath}/coding.matrix.adj.txt ${geneId}`)
              if (rResult.code === 0) {
                // 读取文件内容
                newlist = read(filepath)
              } else {
                console.log(rResult.stderr) //错误日志
              }
            }

            body = {
              list: newlist,
              step: 3,
              ret: 200,
            }

            function read (filepath){
              const str = fs.readFileSync(filepath,'utf8')
              const temp = str.split('\n')
              const header = temp[0].split(',')
              const arr = temp[1].split(',')
              newlist = arr.map((e,i) => ({
                v:e,
                g:'box1',
                t:header[i]
              }))
              return newlist
            }
        } catch (error) {
            body.error = error
        }
        break
      case '4':
        body = {
          list: [{
            id: '12321'
          }],
          step: 4,
          ret: 200,
        }
        break
      case '5':
        body = {
          list: [{
            id: '12321'
          }],
          step: 5,
          ret: 200,
        }
        break
      case '6':
        body = {
          list: [{
            id: '12321'
          }],
          step: 6,
          ret: 200,
        }
        break
      case '7':
        body = {
          list: [{
            id: '12321'
          }],
          step: 7,
          ret: 200,
        }
        break
      case '8':
        body = {
          step: 8,
          list: [{
            Gene: '12321'
          }],
          ret: 200,
        }
        break
      case '9':
        const { colnames1, colnames2 } = await ctx.service.hnclinc.filterByType(type)
        const str1 = colnames1.join(','),str2 = colnames2.join(',')
        const md5String = md5(str1+str2) //这里按照select的选项判断md5？还是按照columnname吧 数据库可能会改
        const rResult =R(`diff.analysis.R`,`${app.config.Rpath}/lncRNA.matrix.adj.txt ${str1} ${str2} ${md5String}`)
        if( rResult.code === 0 ){
          console.log(rResult.code) //状态码
        } else {
          console.log(rResult.stderr) //错误日志
        }
        body = {
          list: [{
            id: '12321'
          }],
          str1,str2,md5String,
          step: 9,
          ret: 200,
        }
        break
      default:
        var {
          item
        } = await ctx.service.gene.getIdByName(geneId)
        body = {
          item,
          step: 0,
          ret: 200,
        }
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.sug = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    q
  } = ctx.request.body

  try {
    const result = q ? await ctx.service.genename.search(q) : []
    body = {
      result:result,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}
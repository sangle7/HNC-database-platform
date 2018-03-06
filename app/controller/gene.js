const R = require('../utils/R');
const md5 = require('md5');

exports.info = function* (ctx) {
  let body = {
    ret: 500,
  }

  const {
    page,
    q
  } = ctx.request.body

  try {
    if (q) {
      const {
        list,
        total
      } = yield ctx.service.gene.search(q)

      body = {
        list,
        ret: 200,
        pagination: {
          current: page ? parseInt(page) : 1,
          total,
        }
      }
    } else {
      const {
        geneIds,
        total
      } = yield ctx.service.hncgene.query(page ? parseInt(page) : 1)
      const list = []
      for (let elem of geneIds) {
        const {
          item
        } = yield ctx.service.gene.getItemById(elem.gene_id)
        list.push(item)
      }

      body = {
        list,
        ret: 200,
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


exports.init = function* (ctx) {
  const app = ctx.app
  let body = {
    ret: 500,
  }

  const {
    geneId,
    step
  } = ctx.request.body
  try {
    switch (step) {
      case '0':
        var {
          item
        } = yield ctx.service.gene.getIdByName(geneId)
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
        } = yield ctx.service.gene.getIdByName(geneId)
        // 根据基因id查找在hncgene表中的hncGeneId
        var {
          hncGeneId
        } = yield ctx.service.hncgene.getIdByGeneId(item.id)
        // 根据hncGeneId查找在gene2pubmed表中的数据
        var {
          list
        } = yield ctx.service.gene2pubmed.query(hncGeneId)
        for (let elem of list) {
          // 在pubmed表中查询pmid
          var {
            result
          } = yield ctx.service.pubmed.getById(elem.pubmed_id)
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
        } = yield ctx.service.gene.getIdByName(geneId)
        // 根据基因id查找在hncgene表中的hncGeneId
        var {
          hncGeneId
        } = yield ctx.service.hncgene.getIdByGeneId(item.id)
        var {
          list
        } = yield ctx.service.gene2pubmed.query(hncGeneId)
        let newlist = []
        for (let elem of list) {
          var {
            result
          } = yield ctx.service.pubmed.getById(elem.pubmed_id)
          var obj1 = yield ctx.service.drug2pubmed.query(elem.pubmed_id)
          let _list = []
          for (let item of obj1.list) {
            // 这里获得药名,两步 先查获取dbid 再查durgbank
            const drugid = item.hncdrug_id
            const {
              dbid
            } = yield ctx.service.hncdrug.queryById(drugid)
            const {
              drug
            } = yield ctx.service.drugbank.queryById(dbid)
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
        body = {
          list: [{
            id: '12321'
          }],
          step: 3,
          ret: 200,
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
        const md5String = md5('sangle-test')
        const rResult =R(`diff.analysis.R`,`${app.config.Rpath}/lncRNA.matrix.adj.txt GSM1359236_FaDu.shG9a.67.824.x,GSM277644 GSM1359236_FaDu.shG9a.67.824.x,GSM277644 ${md5String}`)
        if( rResult.code === 0 ){
          console.log(rResult.code) //状态码
        } else {
          console.log(rResult.stderr) //错误日志
        }
        body = {
          list: [{
            id: '12321'
          }],
          step: 9,
          ret: 200,
        }
        break
      default:
        var {
          item
        } = yield ctx.service.gene.getIdByName(geneId)
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

exports.info = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { page, q } = ctx.request.body

  try {
    const { list, total } = q ? yield ctx.service.gene.search(q) : yield ctx.service.gene.query(page ? parseInt(page): 1)
    body = {
      list,
      ret: 200,
      pagination:{
        current: page ? parseInt(page): 1,
        total,
      }
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}


exports.init = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { geneId, step } = ctx.request.body
  try{
    switch(step){
      case '0':
        var { item } = yield ctx.service.gene.getIdByName(geneId)
        body = {
          item,
          step: 0,
          ret: 200,
        }
        break
      case '1':
        var { item } = yield ctx.service.gene.getIdByName(geneId)
        var { list } = yield ctx.service.gene2pubmed.query(item.id)
        for(let elem of list){
          var { result } = yield ctx.service.pubmed.getById(elem.pubmed_id) 
          elem.pmid = result.pmid
        }
        body = {
          list,
          step: 1,
          ret: 200,
        }
        break
      case '2':
        var { item } = yield ctx.service.gene.getIdByName(geneId)
        var { list } = yield ctx.service.gene2pubmed.query(item.id)
        let newlist = []
        for(let elem of list){
          var { result } = yield ctx.service.pubmed.getById(elem.pubmed_id) 
          var obj1 = yield ctx.service.drug2pubmed.query(elem.pubmed_id) 
          let _list = []
          for (let item of obj1.list){
            // 这里获得药名,两步 先查获取dbid 再查durgbank
            const drugid = item.hncdrug_id
            const { dbid } = yield ctx.service.hncdrug.queryById(drugid) 
            const { drug } = yield ctx.service.drugbank.queryById(dbid) 
            _list = [..._list,{...item,pmid:result.pmid,name:drug.name}]
          }
          //_list 中每个pmid都为result.pmid
          newlist = [...newlist,..._list]
        }
        body = {
          list: newlist,
          step: 2,
          ret: 200,
        }
        break
      case '3':
        body = {
          step: 3,
          ret: 200,
        }
        break
      case '4':
        body = {
          step: 4,
          ret: 200,
        }
        break
      case '5':
        body = {
          step: 5,
          ret: 200,
        }
        break
      case '6':
        body = {
          step: 6,
          ret: 200,
        }
        break
      case '7':
        body = {
          step: 7,
          ret: 200,
        }
        break
      case '8':
        body = {
          step: 8,
          ret: 200,
        }
        break
      case '9':
        body = {
          step: 9,
          ret: 200,
        }
        break
      default:
        var { item } = yield ctx.service.gene.getIdByName(geneId)
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

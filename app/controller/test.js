
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
        for(elem of list){
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
        var { list } = yield ctx.service.drug2pubmed.query(item.id)
        body = {
          list,
          step: 2,
          ret: 200,
        }
        break
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}


exports.genes = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{ id: '213143' }],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.drugschart = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { chart2 } = yield ctx.service.drug2pubmed.generateChart()
  const { chart } = yield ctx.service.target.generateChart()

  try {
    body = {
      chart:[...chart,...chart2],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.drugs = function* (ctx) {
  let body = {
    ret: 500,
  }
  const { page = 1 } = ctx.request.body
  const { list, total } = yield ctx.service.target.queryByPage(page)

  for (let el of list){
    const { item } = yield ctx.service.gene.getItemById(el.gene_id)
    const { dbid } = yield ctx.service.hncdrug.queryById(el.hncdrug_id)
    const { drug } = yield ctx.service.drugbank.queryById(dbid)
    const { result } = yield ctx.service.pubmed.getById(el.pubmed_id)
    const r = yield ctx.service.drug2pubmed.queryByIds(el.hncdrug_id,el.pubmed_id)
    
    
    el.target_gene = item.hgncid
    el.drug_name = drug.name
    el.pmid = result.pmid
    el.efficacy = r && r.efficacy
    el.evidence = r && r.evidence
    el.tumor_site = r && r.tumor_site
    el.note = r && r.note
  }

  try {
    body = {
      list,
      pagination:{
        total,
        current: Number(page),
        pageSize:10,
      },
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.caseschart = function* (ctx){
  let body = {
    ret: 500,
  }
  const { chart } = yield ctx.service.hnclinc.generateChart()
  try {
    body = {
      chart,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.cases = function* (ctx) {
  let body = {
    ret: 500,
  }
  const { page = 1 } = ctx.request.body
  const { list, total } = yield ctx.service.hnclinc.queryByPage(page)

  try {
    body = {
      list,
      pagination:{
        total,
        current: Number(page),
        pageSize:10,
      },
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.records = function* (ctx) {
  let body = {
    ret: 500,
  }
  const { page = 1 } = ctx.request.body
  const { list, total } = yield ctx.service.pubmed.queryByPage(page)

  try {
    body = {
      list,
      pagination:{
        total,
        current: Number(page),
        pageSize:10,
      },
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.ncRNA = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { step } = ctx.request.body
  try{
    switch(step){
      case '0':
        body = {
          list: [{id:'123321'}],
          step: 0,
          ret: 200,
        }
        break
      case '1':
        body = {
          list: [{id:'123321'}],
          step: 1,
          ret: 200,
        }
        break
      case '2':
        body = {
          list: [{id:'123321'}],
          step: 2,
          ret: 200,
        }
        break
      case '3':
        body = {
          list: [{id:'123321'}],
          step: 3,
          ret: 200,
        }
        break
      case '4':
        body = {
          list: [{id:'123321'}],
          step: 4,
          ret: 200,
        }
        break
      default:
        body = {
          list: [{id:'123321'}],
          step: 0,
          ret: 200,
        }
      }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

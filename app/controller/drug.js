
exports.item = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { drugId } = ctx.request.body

  try {
    const { item } = yield ctx.service.drugbank.queryByName(drugId)
    body = {
      item,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

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
      } = yield ctx.service.drugbank.search(q)

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
      } = yield ctx.service.hncdrug.query(page ? parseInt(page) : 1)
      const list = []
      for (let elem of geneIds) {
        const {
          drug
        } = yield ctx.service.drugbank.queryById(elem.drug_id)
        list.push(drug)
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


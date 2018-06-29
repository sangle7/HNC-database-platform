var csv = require("fast-csv");

exports.item = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    drugId
  } = ctx.request.query

  try {
    const {
      item
    } = await ctx.service.drugbank.queryByName(drugId)
    body = {
      item,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.record = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    drugId
  } = ctx.request.query

  try {
    const {
      item
    } = await ctx.service.drugbank.queryByName(drugId)
    var {
      hncDrugId
    } = await ctx.service.hncdrug.getIdBydbid(item.dbid)
    var {
      list
    } = await ctx.service.drug2pubmed.getByDrugId(hncDrugId)
    body = {
      list,
      step: 2,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}


exports.info = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    page,
    q,
    download
  } = ctx.request.query

  let downloadURL = null

  try {
    if (q) {
      const {
        list,
        total
      } = await ctx.service.drugbank.search(q)

      if (download === true) {
        downloadURL = writeToCSV(q, list)
      }

      body = {
        list,
        downloadURL,
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
      } = download === true ? await ctx.service.hncdrug.getAll() : await ctx.service.hncdrug.query(page ? parseInt(page) : 1)
      const list = []
      for (let elem of geneIds) {
        const {
          drug
        } = await ctx.service.drugbank.queryById(elem.drug_id)
        list.push(drug)
      }

      if (download === true) {
        downloadURL = writeToCSV('', list)
      }

      body = {
        list,
        downloadURL,
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

exports.heatmap = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    offset = 0, sorter = {}, filter = '',t
  } = ctx.request.body

  try {
    const {
      list,
      total,
      filtedtotal
    } = await ctx.service.connectivemap.getByPagi({
      offset,
      size: 20,
      sorter,
      filter,
      table:t,
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

function writeToCSV(q, list) {
  csv.writeToPath(`app/public/drug-${q}.csv`, list, {
      headers: true
    })
    .on("finish", function () {
      console.log("done!");
    });
  return `/public/drug-${q}.csv`
}
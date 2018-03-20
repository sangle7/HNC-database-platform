var csv = require("fast-csv");

exports.item = async ctx => {
  let body = {
    ret: 500,
  }

  const { drugId } = ctx.request.body

  try {
    const { item } = await ctx.service.drugbank.queryByName(drugId)
    body = {
      item,
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
  } = ctx.request.body

  let downloadURL = null

  try {
    if (q) {
      const {
        list,
        total
      } = await ctx.service.drugbank.search(q)

      if(download === true){
        downloadURL = writeToCSV(q,list)
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

      if(download === true){
        downloadURL = writeToCSV('',list)
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

function writeToCSV (q,list) {
  csv.writeToPath(`app/public/drug-${q}.csv`, list, {headers: true})
    .on("finish", function(){
        console.log("done!");
  });
  return `/public/drug-${q}.csv`
}

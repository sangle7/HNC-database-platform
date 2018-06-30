exports.info = async ctx =>{
  let body = {
    ret: 500,
  }

  try {
  const lincStats = await ctx.service.hnclinc.getStatistics()
  const lincStats2 = await ctx.service.hnclinc.getIds()
  const pieStats = await ctx.service.hnclinc.getPieChart()
    body = {
      lincStats,
      pieStats,
      lincStats2,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.hnclinc = async ctx =>{
    let body = {
      ret: 500,
    }

    const { page } = ctx.query
  
    try {
    const { list, total } = await ctx.service.hnclinc.queryByPage(page)
      body = {
        list,
        pagination: {
          current: page ? parseInt(page) : 1,
          total,
        },
        ret: 200,
      }
    } catch (error) {
      body.error = error
    }
    ctx.body = body
}

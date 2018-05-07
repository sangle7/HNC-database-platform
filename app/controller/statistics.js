exports.info = async ctx =>{
  let body = {
    ret: 500,
  }

  try {
  const lincStats = await ctx.service.hnclinc.getStatistics()
  const pieStats = await ctx.service.hnclinc.getPieChart()
    body = {
      lincStats,
      pieStats,
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

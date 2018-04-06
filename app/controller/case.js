
exports.item = async ctx =>{
  let body = {
    ret: 500,
  }

  const { caseId } = ctx.request.query

  try {
    const { item } = await ctx.service.hnclinc.queryById(caseId)
    body = {
      item: item || {},
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

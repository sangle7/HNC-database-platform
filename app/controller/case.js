
exports.item = async ctx =>{
  let body = {
    ret: 500,
  }

  const { caseId } = ctx.request.query

  try {
    const { list } = await ctx.service.hnclinc.queryById(caseId)
    body = {
      list: list || [],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

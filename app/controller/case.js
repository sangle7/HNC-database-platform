
exports.item = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { caseId } = ctx.request.body

  try {
    const { item } = yield ctx.service.hnclinc.queryById(caseId)
    body = {
      item: item || {},
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

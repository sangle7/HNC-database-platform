
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

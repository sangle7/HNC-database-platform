exports.init = async ctx => {
  let body = {
    ret: 500,
  }

  const {
    gene
  } = ctx.request.body

  try {
    const result = gene ? await ctx.service.survivalgene.get(gene) : false
    body = {
      gene: result ? gene : null,
      msg: result ? null : 'Please Input The Correct Gene Name.',
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}
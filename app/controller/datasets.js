
exports.genes = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{id:'213143'}],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.drugs = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{id:'213143'}],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.cases = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{id:'213143'}],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.records = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{id:'213143'}],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

exports.ncRNA = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{id:'213143'}],
      ret: 200,
    }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}


exports.genes = function* (ctx) {
  let body = {
    ret: 500,
  }

  try {
    body = {
      list: [{ id: '213143' }],
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
      list: [{ id: '213143' }],
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
      list: [{ id: '213143' }],
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
      list: [{ id: '213143' }],
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

  const { step } = ctx.request.body
  try{
    switch(step){
      case '0':
        body = {
          list: [{id:'123321'}],
          step: 0,
          ret: 200,
        }
        break
      case '1':
        body = {
          list: [{id:'123321'}],
          step: 1,
          ret: 200,
        }
        break
      case '2':
        body = {
          list: [{id:'123321'}],
          step: 2,
          ret: 200,
        }
        break
      case '3':
        body = {
          list: [{id:'123321'}],
          step: 3,
          ret: 200,
        }
        break
      case '4':
        body = {
          list: [{id:'123321'}],
          step: 4,
          ret: 200,
        }
        break
      default:
        body = {
          list: [{id:'123321'}],
          step: 0,
          ret: 200,
        }
      }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

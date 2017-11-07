
exports.init = function* (ctx) {
  let body = {
    ret: 500,
  }

  const { step } = ctx.request.body
  try{
    switch(step){
      case '0':
        body = {
          step: 0,
          ret: 200,
        }
        break
      case '1':
        body = {
          step: 1,
          ret: 200,
        }
        break
      case '2':
        body = {
          step: 2,
          ret: 200,
        }
        break
      case '3':
        body = {
          step: 3,
          ret: 200,
        }
        break
      case '4':
        body = {
          step: 4,
          ret: 200,
        }
        break
      default:
        body = {
          step: 0,
          ret: 200,
        }
      }
  } catch (error) {
    body.error = error
  }
  ctx.body = body
}

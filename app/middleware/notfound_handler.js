
const fs = require('fs')
const path = require('path')
module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if(/\.png$/.test(ctx.request.url)){
        ctx.body = fs.readFile(path.join(__dirname,'..','public','default.jpg'))
      }
    }
  };
};
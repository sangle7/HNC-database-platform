
module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    console.log('notfound')
    if (ctx.status === 404) {
      console.log('404040404')
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        ctx.body = '<h1>Page Not Found</h1>';
      }
    }
  };
};
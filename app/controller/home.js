

module.exports = (app) => {
  return class HomeController extends app.Controller {
    * index () {
      const { ctx } = this
      yield ctx.render('index.html', {})
    }
  }
}

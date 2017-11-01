'use strict';
const path = require('path');

module.exports = app => {
  class HomeController extends app.Controller {
    * index () {
      const { ctx } = this
      yield ctx.render(path.join(__dirname, '..','..','index.html'))
    }
  }
  return HomeController;
};

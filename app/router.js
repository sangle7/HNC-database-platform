'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/test/info', app.controller.test.info)
  app.post('/test/init', app.controller.test.init)
};

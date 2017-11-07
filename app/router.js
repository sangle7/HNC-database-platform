'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/gene/info', app.controller.gene.info)
  app.post('/gene/init', app.controller.gene.init)

  app.post('/drug/item', app.controller.drug.item)

  app.post('/case/item', app.controller.case.item)
};

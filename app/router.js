'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('*', 'home.index');
  app.post('/cgi/gene/info', app.controller.gene.info)
  app.post('/cgi/gene/init', app.controller.gene.init)

  app.post('/cgi/drug/item', app.controller.drug.item)

  app.post('/cgi/case/item', app.controller.case.item)

  app.post('/cgi/datasets/genes', app.controller.datasets.genes)
  app.post('/cgi/datasets/drugs', app.controller.datasets.drugs)
  app.post('/cgi/datasets/cases', app.controller.datasets.cases)
  app.post('/cgi/datasets/records', app.controller.datasets.records)
  app.post('/cgi/datasets/ncRNA', app.controller.datasets.ncRNA)
};

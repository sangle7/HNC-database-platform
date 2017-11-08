'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/gene/info', app.controller.gene.info)
  app.post('/gene/init', app.controller.gene.init)

  app.post('/ncRNA/init', app.controller.ncRNA.init)

  app.post('/drug/item', app.controller.drug.item)

  app.post('/case/item', app.controller.case.item)

  app.post('/datasets/genes', app.controller.datasets.genes)
  app.post('/datasets/drugs', app.controller.datasets.drugs)
  app.post('/datasets/cases', app.controller.datasets.cases)
  app.post('/datasets/records', app.controller.datasets.records)
  app.post('/datasets/ncRNA', app.controller.datasets.ncRNA)
};

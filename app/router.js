'use strict';

module.exports = app => {
  app.get('/statistics',app.controller.statistics.info)
  app.get('/drugs', app.controller.drug.info)
  app.get('/genes', app.controller.gene.info)
  app.get('/gene/:geneId', app.controller.gene.init)

  app.get('/gene/sug', app.controller.gene.sug)
  app.get('/gene/survivalsug', app.controller.gene.survivalsug)
  app.post('/gene/heatmap', app.controller.gene.heatmap)

  app.post('/drug/heatmap', app.controller.drug.heatmap)
  

  app.post('/diff/init', app.controller.diff.init)
  app.post('/diff/table', app.controller.diff.table)
  app.post('/diff/boxplot', app.controller.diff.boxplot)
  
  app.post('/corr/init', app.controller.corr.init)

  app.post('/survival/init', app.controller.survival.init)

  app.get('/drug/item', app.controller.drug.item)

  app.get('/case/item', app.controller.case.item)

  app.get('/', 'home.index');
  // app.get('*', 'home.index');
};

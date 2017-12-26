'use strict';

// had enabled by egg

module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  static: true,
  nunjucks:{
    enable: true,
    package: 'egg-view-nunjucks'
  }
};
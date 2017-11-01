'use strict';

const egg = require('egg');
const os = require('os');
const process = require('process');

// 使用CPU数量的一半
const cpus = parseInt(os.cpus().length / 2, 10);
const config = require('./conf/config.json');

const port = (process.env.PORT === undefined
  || isNaN(process.env.PORT)
  || process.env.PORT <= 0) ? config.serverPort : process.env.PORT;

egg.startCluster({
  baseDir: __dirname,
  port,
  workers: process.env.UAE_MODE !== 'PROD' ? 1 : cpus,
});

'use strict';
const path = require('path');

module.exports = {
  keys: '0904',
  // middleware: [ 'notfoundHandler' ],
  security: {
    domainWhiteList: [
      'localhost',
    ],
    methodnoallow: {
      enable: false
    },
    csrf: {
      enable: false
    }
  },
  static:{
    gzip: true,
  },
  bodyParser: {
    enable: true,
    encoding: 'utf8',
    formLimit: '32000kb', // form body 的大小限制，默认为 100kb
    jsonLimit: '32000kb', // json body 的大小限制，默认为 100kb
    strict: false, // json body 解析是否为严格模式，如果为严格模式则只接受 object 和 array
    enableTypes: [
      'json', 'form', 'text'
    ], // content-type
  },
  view: {
    defaultViewEngine: 'nunjucks',
  },
  // middleware: ['gzip'],
  gzip: {
    threshold: 1024, // 小于 1k 的响应体不压缩
  },
}
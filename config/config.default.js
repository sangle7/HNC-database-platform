'use strict';
const path = require('path');
exports.keys = '0904'

exports.security = {
  domainWhiteList: [
    'localhost',
  ],
  methodnoallow: {
    enable: false
  },
  csrf: {
    enable: false
  }
}

exports.bodyParser = {
  enable: true,
  encoding: 'utf8',
  formLimit: '32000kb', // form body 的大小限制，默认为 100kb
  jsonLimit: '32000kb', // json body 的大小限制，默认为 100kb
  strict: false, // json body 解析是否为严格模式，如果为严格模式则只接受 object 和 array
  enableTypes: [
    'json', 'form', 'text'
  ], // content-type
}
exports.view = {
  defaultViewEngine: 'nunjucks'
}


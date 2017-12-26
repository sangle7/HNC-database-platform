'use strict';
const path = require('path');

exports.index = function* (ctx) {
  ctx.renderView(path.resolve(__dirname,'..','public','index.html'))
}

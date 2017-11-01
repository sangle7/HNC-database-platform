const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.dev.config');

module.exports = () => {
  return function* devserver (next) {
    yield next
    const compiler = webpack(config);
    this.app.use(webpackDevMiddleware(compiler, {
      stats: {
        colors: true
      },
      publicPath: config.output.publicPath,
      hot: true,
    }));
    this.app.use(webpackHotMiddleware(compiler,{
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
  }
}
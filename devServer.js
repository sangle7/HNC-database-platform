const path = require('path');
const conf = require('./conf/config.json')
const proxy = require('express-http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.config');
const Express = require('express');

const app = new Express();
const port = 3001;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  stats: {
    colors: true
  },
  publicPath: config.output.publicPath,
  hot: true,
}));
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));
app.use('/', proxy(`localhost:${conf.serverPort}`, {
  proxyReqPathResolver: function (req) {
    return require('url').parse(req.url).path;
  },
  filter: function (req, res) {
    return req.method == 'POST' || /^\/public/.test(req.path);
  }
}));
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


app.listen(port, error => {
  /* eslint-disable no-console */
  if (error) {
    console.error(error);
  } else {
    console.info(
      '🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port, port);
  }
  /* eslint-enable no-console */
});
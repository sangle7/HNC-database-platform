const webpack = require('webpack');
const env = process.env.NODE_ENV;
const path = require('path');
const theme = require('./src/theme.js');

const config = {
  entry: ['./src/index','webpack-hot-middleware/client'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]-dev.js',
    publicPath: '/static',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader?modules', 'less-loader'],
        exclude: /node_modules/,
      }, 
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
        exclude: /src/,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ],
  },
};

module.exports = config;

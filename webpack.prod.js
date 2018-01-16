const webpack = require('webpack');
const env = process.env.NODE_ENV;
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ToxicWebpackManifestPlugin = require('toxic-webpack-manifest-plugin');
const theme = require('./src/theme.js');

const config = {
  entry: {
    vendor: ['react', 'prop-types', 'classnames', 'react-dom', 'react-router-dom'],
    main: './src/index',
  },
  output: {
    path: path.join(__dirname, 'app', 'public'),
    publicPath:'/public/',
    filename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'], // 指定公共 bundle 的名字。
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      title:'HNC-gene-database',
      filename:'../view/index.html',
      template:'./index.html'
    })
  ],
  devtool: false,
  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]', 'less-loader']
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
        }),
        exclude: /src/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
      }
    ],
  },
};

module.exports = config;
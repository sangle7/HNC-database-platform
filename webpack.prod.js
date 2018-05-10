const webpack = require('webpack');
const env = process.env.NODE_ENV;
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const theme = require('./src/theme.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    vendor: [
      'react', 
      'classnames', 
      'react-dom', 
      'react-router-dom',
      'query-string'
    ],
    ui:[
      'react-bootstrap/lib/Navbar',
      'react-bootstrap/lib/Nav',
      'react-bootstrap/lib/NavItem',
      'react-bootstrap/lib/NavDropdown',
      'react-bootstrap/lib/MenuItem',
      'antd/lib/button', 
      'antd/lib/table', 
      'antd/lib/form', 
      'antd/lib/icon', 
      'antd/lib/spin', 
      'antd/lib/modal', 
      'antd/lib/select', 
      'antd/lib/tabs', 
      'antd/lib/input', 
      'antd/lib/message',
      'antd/lib/back-top',
    ],
    main: './src/index',
  },
  output: {
    path: path.join(__dirname, 'app', 'public', 'static'),
    publicPath: '/public/static/',
    filename: '[name]-[hash].js',
  },
  externals: {
    "echarts": "window.echarts"
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        beautify: false,
        comments: false, // remove all comments
      },
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['ui','vendor','manifest'], // 指定公共 bundle 的名字。
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      title: 'HNC-gene-database',
      filename: '../../view/index.html',
      template: './index.html'
    })
  ],
  devtool: false,
  module: {
    loaders: [{
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less$/,
        // loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]', 'less-loader'],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]', 'less-loader']
        }),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less$/,
        // loaders: ['style-loader', 'css-loader', `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`],
        }),
        include: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        // loaders: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        }),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=[name].[ext]?[hash]',
        include: path.resolve(__dirname, 'src')
      }, {
        test: /\.md$/,
        loaders: ['html-loader', 'markdown-loader'],
        include: path.resolve(__dirname, 'src')
      },
    ],
  },
};

module.exports = config;
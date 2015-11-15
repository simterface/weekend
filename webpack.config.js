var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var outputPath = path.resolve(__dirname, 'public/build/');
var mainFile = path.resolve(__dirname, 'src', 'weekend.js');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8000',
    mainFile
  ],
  output: {
    path: outputPath,
    publicPath: '/build/',
    filename: 'weekend.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin('weekend.bundle.css'),
        new Webpack.HotModuleReplacementPlugin()
    ],
  externals: {
    'jquery':'jQuery'
  }
};

const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const options = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: './popup/index.html',
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Develop',
      template: './develop/index.html',
      inject: true,
      chunks: ['develop'],
      filename: 'develop.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Article',
      template: './article/index.html',
      inject: true,
      chunks: ['article'],
      filename: 'article.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Books',
      template: './books/index.html',
      inject: true,
      chunks: ['books'],
      filename: 'books.html',
    }),
    new WebpackShellPlugin({
      onBuildEnd: ['node scripts/remove-evals.js'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        background: 'background',
        popup: 'popup',
        article: 'article',
        develop: 'develop',
        contentScripts: ['contentScripts/recommend/index'],
      },
    }),
  ],
});
module.exports = options;

const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000
  },
  resolve: {
    alias: {
      assets: `${__dirname}/assets/`,
      js: `${__dirname}/js/`
    },
    mainFields: ['main']
  },
  entry: {
    code: './js/main.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.(png|jpe?g|svg)$/i, type: 'asset/resource', include: [path.resolve(__dirname, 'assets/')] },
      { test: /\.(json)$/i, type: 'asset/resource', include: [path.resolve(__dirname, 'assets/')] },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: './html/index.html.ejs',
    }),
  ]
};
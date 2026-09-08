const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
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
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            targets: '> 1%',
            plugins: ['@babel/plugin-transform-template-literals', '@babel/plugin-proposal-optional-chaining']
          }
        },
      }
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: './html/index.html.ejs',
    }),
  ]
};
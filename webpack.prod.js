const merge = require('webpack-merge');
const webpackCommonConf = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]

});

const merge = require('webpack-merge');
const webpackCommonConf = require('./webpack.common');
const WebpackCleanPlugin = require('webpack-clean-plugin');

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  plugins: [
    new WebpackCleanPlugin({
      on: 'emit',
      path: 'dist'
    })
  ]

});

const merge = require('webpack-merge');
const commonWebpackConf = require('./webpack.common');

module.exports = merge(commonWebpackConf, {
  mode: 'development'
});

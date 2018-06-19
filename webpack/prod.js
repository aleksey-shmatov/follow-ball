// production config
const merge = require('webpack-merge');
const {resolve} = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: [ './index.tsx'] ,
  output: {
    filename: '[name].min.js',
    path: resolve(__dirname, '../public'),
    publicPath: '/',
  },
  devtool: 'source-map',
});
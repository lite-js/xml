const _ = require('lodash');
const webpackConf = require('./webpack.config');

module.exports = _.extend({
  devServer: {
    stats: {
      cached: false,
      exclude: [
        /node_modules[\\\/]/
      ],
      colors: true
    }
  },
  devtool: 'source-map',
}, webpackConf);

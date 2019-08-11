// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
const commonConfig = require('./common');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: '../static/config/prod' },
      { from: '../static/images' },
      { from: '../static/messages' },
    ])
  ],
});

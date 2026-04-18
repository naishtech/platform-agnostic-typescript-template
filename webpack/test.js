// test config
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: '../static/config/test', to: 'config' },
        { from: '../static/images', to: 'images' },
        { from: '../static/messages', to: 'messages' },
      ],
    })
  ],
});

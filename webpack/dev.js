// development config
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
  },
  devServer: {
    static: resolve(__dirname, '../dist'),
    port: 8080,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: '../static/config/dev', to: 'config' },
        { from: '../static/images', to: 'images' },
        { from: '../static/messages', to: 'messages' }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
});

// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      favicon: '../static/images/favicon.ico',
      title: 'Platform Agnostic TypeScript Template',
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        name: 'Platform Agnostic TypeScript Template',
        description: 'Template for making full stack multi-platform applications in TypeScript',
        keywords: 'Platform Agnostic TypeScript Template',
        title: 'Platform Agnostic TypeScript Template'
      },
    }),
  ],
  performance: {
    hints: false,
  },
};


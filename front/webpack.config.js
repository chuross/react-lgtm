const webpack = require("webpack");
const path = require('path');
const configs = require('config');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const webpackHtmlTemplate = require('html-webpack-template');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const jsDir = path.resolve('src/js');
const cssDir = path.resolve('src/css');

module.exports = {
  entry: `${jsDir}/app.js`,
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: webpackHtmlTemplate,
      appMountId: 'app',
      title: 'LGTM画像アップローダー'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },
  externals: {
    Config: JSON.stringify(configs)
  },
  postcss: function() {
    return [atImport, autoprefixer];
  },
  resolve: {
    root: [jsDir, cssDir],
    extensions: ['', '.js', '.jsx']
  }
}

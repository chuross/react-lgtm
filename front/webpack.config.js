var path = require('path');
var configs = require('config');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var webpackHtmlTemplate = require('html-webpack-template');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    })
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

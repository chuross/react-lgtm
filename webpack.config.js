var path = require('path');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

const jsDir = path.resolve('src/js');
const cssDir = path.resolve('src/css');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    `${jsDir}/app.js`
  ],
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('index.template.html')
    }),
    new WebpackNotifierPlugin()
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
  postcss: function() {
    return [autoprefixer, postcssImport];
  },
  resolve: {
    root: [jsDir, cssDir],
    extensions: ['', '.js', '.jsx', '.css']
  }
}

var path = require('path');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var webpackHtmlTemplate = require('html-webpack-template');
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
  externals: {
    Config: JSON.stringify({
      apiBaseUrl: process.env.LGTM_API_BASE_URL
    })
  },
  postcss: function() {
    return [atImport, autoprefixer];
  },
  resolve: {
    root: [jsDir, cssDir],
    extensions: ['', '.js', '.jsx']
  }
}

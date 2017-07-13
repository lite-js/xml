const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {
  resolve
} = require('path')

function resolvePath (pathname) {
  return resolve(__dirname, pathname)
}

module.exports = {
  entry: {
    'dist/index': resolvePath('./src/index.js'),
    'dist/xml': resolvePath('./indexBrowser.js')
  },
  output: {
    filename: '[name].js',
    library: 'XML',
    libraryTarget: 'umd',
    path: __dirname,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /locale/,
        query: {
          presets: [
            'es2015'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      }
    ]
  },
  externals: {
    codemirror: 'CodeMirror',
    jquery: 'jQuery',
    '@lite-js/xml': 'XML'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ],
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 8080
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}

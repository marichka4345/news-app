const webpack = require('webpack');

const path = require('path');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const COMMON_CONFIG = {
  entry: {
    fetchPolyfill: 'whatwg-fetch',
    main: './app/index.js'
  },
  output: {
    filename: '[name].[contenthash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'app/index.handlebars',
      excludeChunks: ['fetchPolyfill']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:6].css'
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [path.join(__dirname, 'app/helpers')],
          precompileOptions: {
            knownHelpersOnly: false,
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.scss$/,
          chunks: 'initial'
        }
      }
    }
  }
};

const DEV_CONFIG = {
  mode: 'development',
  devServer: {
    overlay: true
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
};

const PROD_CONFIG = {
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
};

module.exports = (env) => {
  const config = env === 'dev'
    ? DEV_CONFIG
    : PROD_CONFIG;

  return merge(COMMON_CONFIG, config);
};
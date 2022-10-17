const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  build: path.resolve(__dirname, 'build'),
  client: path.resolve(__dirname, 'client'),
  public: path.resolve(__dirname, 'public'),
  templates: path.resolve(__dirname, 'templates')
};

module.exports = {
  mode: isProduction ? 'production' : 'development',
  target: isProduction ? 'browserslist' : 'web',
  entry: path.resolve(paths.client, 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: paths.build,
    clean: true
  },
  devServer: {
    static: {
      directory: paths.public
    },
    port: 5000,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.client,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack'
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|avif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isProduction
                  ? '[hash:base64:5]'
                  : '[name]__[local]--[hash:base64:5]',
                mode: resourcePath => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return 'pure';
                  }

                  if (/module.css$/i.test(resourcePath)) {
                    return 'local';
                  }

                  return 'global';
                }
              },
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.templates, 'index.html'),
      inject: 'body'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/**/*',
          to: '[name][ext]'
        }
      ]
    }),

    !isProduction && new ReactRefreshWebpackPlugin(),

    isProduction &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      })
  ].filter(Boolean),
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
};

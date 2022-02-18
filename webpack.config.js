
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProductionMode = argv.mode === 'production';
  return {
    entry: path.resolve(__dirname, './src/pages/index.js'),

    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    mode: isProductionMode ? "production" : "development",

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        cache: false,
      }),
      new MiniCssExtractPlugin({
        filename: isProductionMode ? "[name].[contenthash].css" : "[name].css",
      }),
    ],

    optimization: {
      minimize: isProductionMode,
      minimizer: [
        new CssMinimizerPlugin({
          test: /\.css$/i,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)/,
          type: 'asset/resource',
        }
      ],
    },
  }
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const styleLoader = argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
  const config =  {
    entry: path.resolve(__dirname, 'src', 'scripts', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            cache: false,
        }),
    ],

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              styleLoader, 
              {
                loader: 'css-loader',
                option: {
                  importLoader: 1,
                },
              },
              {
                loader: 'postcss-loader',
              },
            ],
          },
          {
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)/,
            type: 'asset/resource',
          }
        ],
      },
    }

    if (argv.mode === 'production') {
      config.plugins.push(new MiniCssExtractPlugin())
    }

    return config
};
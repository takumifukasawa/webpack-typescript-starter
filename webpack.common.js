'use strict';

const readConfig = require('read-config');
const path = require('path');
const fs = require('fs');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

// base config
const constants = readConfig('./constants.yml');

const { SRC, DEST, BASE_DIR } = constants;


const templateParameters = Object.assign(
  {},
  constants,
  {
    meta: readConfig(`${SRC}/pug/meta.yml`)
  }
);

const pages = fs.readdirSync(path.resolve(__dirname, `${SRC}/pug/page`))
  .filter(fileName => fileName.endsWith("pug")).map(fileName => ({
      template: `${SRC}/pug/page/${fileName}`,
      filename: `${fileName.substr(0, fileName.length - 4)}.html`,
  }));

module.exports = {
  // エントリーファイル
  entry: {
    'js/script': `${SRC}/ts/script.ts`,
    'css/style': `${SRC}/scss/style.scss`,
  },
  // 出力するディレクトリ・ファイル名などの設定
  output: {
    path: path.resolve(__dirname, DEST + BASE_DIR),
    filename: '[name].js',
    publicPath: BASE_DIR,
  },
  module: {
    // 各ファイル形式ごとのビルド設定
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              root: path.resolve(`${SRC}/pug/`),
              pretty: true,
            }
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [ `${SRC}/scss` ],
              },
            },
          }
        ]
      }
    ]
  },
  // キャシュ有効化
  cache: true,
  // 拡張子省略時のpath解決
  resolve: {
    extensions: ['.js', '.json', '.ts', '*'],
    alias: {
      '@': path.join(__dirname, SRC, 'ts'),
    }
  },

  plugins: [
    ...pages.map(({ template, filename }) => new HtmlWebpackPlugin({
      template,
      filename,
      templateParameters
    })),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new FixStyleOnlyEntriesPlugin(),
  ]
}

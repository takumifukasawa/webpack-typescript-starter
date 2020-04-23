const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const readConfig = require('read-config');

// base config
const SRC = './src';
const DEST = './public';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const constants = readConfig(`${SRC}/constants.yml`);
const { BASE_DIR } = constants;

module.exports = merge(common, {
    mode: 'development',
    devServer: {
      host: HOST,
      port: PORT,
      contentBase: DEST,
      openPage: path.relative('/', BASE_DIR),
    },
});
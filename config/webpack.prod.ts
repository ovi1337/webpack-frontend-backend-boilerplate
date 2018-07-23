import { getFrontendBaseConfig, getFrontendStyleConfig } from './webpack.common.frontend';
import { getServerConfig } from './webpack.common.server';
import { Environment } from './webpack';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const SassWebpackPlugin = require('sass-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


export const getProductionConfig = (env: Environment) => {
  return [
    webpackMerge(getFrontendBaseConfig(env), {
      devtool: 'source-map',
      output: {
        path: path.resolve(__dirname, '../build/public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
      },
      plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'ENV': JSON.stringify('production'),
          }
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
      ]
    }),

    webpackMerge(getFrontendStyleConfig(env), {
    }),

    webpackMerge(getServerConfig(env), {
    }),
  ];
};
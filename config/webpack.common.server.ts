import { Environment } from "./webpack";

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

export const getServerConfig = (env: Environment) => {
    return {
        name: 'server',
        entry: [
            './src/server.ts',
        ],
        watch: true,
        target: 'node',
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        externals: [nodeExternals({
            whitelist: ['webpack/hot/poll?1000']
        })],
        mode: 'development',
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, '../build')
        },
        plugins: [
            new CleanWebpackPlugin(['build'], {
                dry: false,
                watch: true,
                exclude: [
                    'public'
                ],
                root: path.resolve(__dirname, '../'),
            }),
            new StartServerPlugin('server.js'),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    "BUILD_TARGET": JSON.stringify('server')
                }
            }),
            new webpack.WatchIgnorePlugin([
                /\.js$/,
                /\.d\.ts$/
            ]),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                Plc: 'Plc',
            }),
        ],
    }
}
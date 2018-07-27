import { Environment } from "./webpack";

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');

export const getServerConfig = (env: Environment) => {
    const config = {
        name: 'server',
        entry: [
            'webpack/hot/poll?1000',
            './src/server.ts',
        ],
        watch: env.watch ? true : false,
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
        externals: [
            nodeExternals({
                whitelist: ['webpack/hot/poll?1000']
            })
        ],
        mode: 'development',
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, '../build')
        },
        devServer: {
            contentBase: path.resolve(__dirname, '../build'),
            hot: true
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
            new webpack.NamedModulesPlugin(),
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

    if(env.watch) {
        return webpackMerge(config, {
            plugins: [
                new StartServerPlugin({
                    name: 'server.js',
                    nodeArgs: ['--inspect=127.0.0.1:9229'], // allow debugging
                    //args: ['scriptArgument1', 'scriptArgument2'], // pass args to script
                    //signal: false | true | 'SIGUSR2', // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
                    keyboard: true, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
                  }),
                new webpack.HotModuleReplacementPlugin(),
            ]
        });
    }

    return config;
}
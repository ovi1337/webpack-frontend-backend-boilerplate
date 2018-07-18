import { Environment } from "./webpack";

const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

export const getServerConfig = (env:Environment) => {
    return {
        name: 'server',
        entry: './src/server.ts',
        target: 'node',
        plugins: [
            new webpack.WatchIgnorePlugin([
                /\.js$/,
                /\.d\.ts$/
            ]),
            new NodemonPlugin({
                args: [],
                watch: path.resolve('./build'),
                ignore: [
                    '*.js.map',
                    '*.d.ts',
                    'public/*',
                ],
                verbose: true,
                nodeArgs: ['--inspect'],
                script: './build/server.js',
                ext: 'js,json'
            }),
        ],
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
            nodeExternals()
        ],
        mode: 'development',
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, '../build')
        }
    }
}
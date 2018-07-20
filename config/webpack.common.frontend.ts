import { Environment } from "./webpack";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

export const getFrontendConfig = (env:Environment) => {
    return {
        name: 'frontend',
        entry: {
            'polyfills': './frontend/polyfills.ts',
            'vendor': './frontend/vendor.ts',
            'app': './frontend/main.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, '../build/public')
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    loader: '@ngtools/webpack',
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'raw-loader',
                            //loader: env.production ? MiniCssExtractPlugin.loader : 'raw-loader',
                        }, {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: false,
                                url: false,
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            '> 1%',
                                            'last 4 versions',
                                            'not ie < 11',
                                            'Firefox >= 38'
                                        ]
                                    }),
                                ]
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    //'./frontend/*.scss'™
                                ]
                            }
                        },
                    ]
                },
                /*
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    './frontend/*.scss'
                                ]
                            }
                        }]
                },
                */
                { test: /\.css$/, loader: 'raw-loader' },
                { test: /\.html$/, loader: 'raw-loader' },
                {
                    // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                    // Removing this will cause deprecation warnings to appear.
                    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                    parser: {
                        system: true
                    },
                },
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: './frontend/assets', to: './assets' },
                { from: './frontend/favicon.ico', to: '.' }
            ]),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                template: './frontend/index.html',
                favicon: './frontend/favicon.ico',
                minify: false,
                links: [{
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/styles.css'
                }],
                inject: 'head',
                output: './build/public',
            }),
            new ScriptExtPlugin({
                defaultAttribute: 'defer'
            }),
            new AngularCompilerPlugin({
                tsConfigPath: './frontend/tsconfig.app.json',
                entryModule: './frontend/app/app.module#AppModule',
                sourceMap: true,
                skipCodeGeneration: false,
                compilerOptions: {}
            }),
        ],
    }
}
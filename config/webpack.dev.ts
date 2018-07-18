import { getFrontendConfig } from './webpack.common.frontend';
import { getServerConfig } from './webpack.common.server';

const path = require('path');
const webpackMerge = require('webpack-merge');

export const getDevelopmentConfig = (env) => {
    return [
        webpackMerge(getFrontendConfig(env), {
            devServer: {
                contentBase: path.join(__dirname, '../build/public'),
                compress: true,
                port: 3000
            }
        }),

        webpackMerge(getServerConfig(env), {
            /*
            devServer: {
            contentBase: path.join(__dirname, 'build'),
            compress: true,
            port: 3001
            }
            */
        })
    ];
};
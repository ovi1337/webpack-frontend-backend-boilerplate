import { getDevelopmentConfig } from './webpack.dev';
import { getProductionConfig } from './webpack.prod';

module.exports = env => {
    if (env.production) {
        process.env.NODE_ENV = process.env.ENV = 'production';

        return getProductionConfig(env);
    }

    return getDevelopmentConfig(env);
};
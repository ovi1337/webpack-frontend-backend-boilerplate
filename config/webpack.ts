import { getDevelopmentConfig } from './webpack.dev';
import { getProductionConfig } from './webpack.prod';

export interface Environment {
    production: boolean;
};

module.exports = (env: Environment) => {
    if (env.production) {
        process.env.NODE_ENV = process.env.ENV = 'production';

        return getProductionConfig(env);
    }
    
    process.env.NODE_ENV = process.env.ENV = 'development';

    return getDevelopmentConfig(env);
};
import { environment as dev } from './environment.dev';
import { environment as prod } from './environment.prod';

export interface Environment {
  production: boolean;
  development: boolean;
};

export const environment: Environment = (process.env.ENV === 'production') ? prod : dev;

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

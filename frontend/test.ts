import 'jest-preset-angular';

declare let global: any;
global.environment = {
    test: true,
};

Object.defineProperty(window, 'dataLayer', {value: []});

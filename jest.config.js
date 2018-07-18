module.exports = {
    "preset": "jest-preset-angular",
    "coverageReporters": [
        "lcov",
        "html"
    ],
    "coveragePathIgnorePatterns": [
        "<rootDir>/frontend/app/",
        "<rootDir>/node_modules/"
    ],
    "collectCoverageFrom": [
        "**/frontend/app/**/*.ts"
    ],
    "globals": {
        "ts-jest": {
            "tsConfigFile": "frontend/tsconfig.spec.json"
        },
        "__TRANSFORM_HTML__": true
    },
    "moduleDirectories": [
        "blue/node_modules",
        "node_modules"
    ],
    "moduleNameMapper": {
        "^application/(.*)": "<rootDir>/frontend/app/$1",
        "^tests/(.*)": "<rootDir>/frontend/app/tests/$1"
    },
    "setupTestFrameworkScriptFile": "./frontend/test.ts",
    "testMatch": [
        "**/frontend/app/**/*.spec.ts"
    ]
};

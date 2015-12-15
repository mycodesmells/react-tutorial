var path = require('path');

module.exports = {
    rootDir: '.',
    scriptPreprocessor: './node_modules/babel-preset-react',
    testDirectoryName: '__tests__',
    testPathIgnorePatterns: [
        'node_modules'
    ],
    unmockedModulePathPatterns: [
        './node_modules/core-js',
        './node_modules/react',
        './node_modules/react-dom',
        './node_modules/react-addons-test-utils',
        './node_modules/fbjs',
        './node_modules/react-bootstrap'
    ]
};

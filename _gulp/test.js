var gulp = require('gulp');
var jest = require('jest-cli');

var jestConfig = require('../_config/jest-config')

gulp.task('test', function() {
    jest.runCLI({
        config : jestConfig,
        verbose: true
    }, ".");
});

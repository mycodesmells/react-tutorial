var gulp = require('gulp');
var requireDir = require('require-dir');

require('harmonize')();

requireDir('./_gulp');

gulp.task('default', ['less', 'webpack']);

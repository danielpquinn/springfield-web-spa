'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('babelify', function () {
  browserify()
    .add(require.resolve('babel/polyfill'))
    .add('./js/main.js')
    .transform(babelify)
    .bundle()
    .pipe(source('output.js'))
    .pipe(gulp.dest('./dist'));
});
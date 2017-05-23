'use strict';
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const template = require('gulp-template');
const rename = require('gulp-rename');
const preprocess = require('gulp-preprocess');

const info = JSON.parse(fs.readFileSync('./build.json'));
const files = info.files;

gulp.task('build-es5', function() {
  return gulp.src(files)
    .pipe(preprocess({context: { EXPORT: '' }}))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015']}))
    .pipe(concat('black-es5.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-es6', function() {
  return gulp.src(files)
    .pipe(preprocess({context: { EXPORT: '', DEBUG: true }}))
    .pipe(sourcemaps.init())
    .pipe(concat('black-es6.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-es6-module', function() {
  return gulp.src(files)
    .pipe(preprocess({context: { EXPORT: 'export' }}))
    .pipe(sourcemaps.init())
    .pipe(concat('black-es6-module.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-examples', ['build-es6'], function() {
  return gulp.src('./dist/black-es6.*')
    .pipe(gulp.dest('../Black-Examples/node_modules/black/dist/'));
});

gulp.task('examples', ['build-es6'], function() {
  gulp.watch(['./src/**/*.js'], ['copy-examples']);
});

gulp.task('default', ['build-es5', 'build-es6', 'build-es6-module']);

gulp.task('watch-es6-module', ['build-es6-module'], function() {
  gulp.watch(['./src/**/*.js'], ['build-es6-module']);
});

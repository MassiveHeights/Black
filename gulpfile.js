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
const mocha = require('gulp-mocha');
const info = JSON.parse(fs.readFileSync('./build.json'));
const files = info.files;
const bs = require('browser-sync').create();

gulp.task('build-es5', function () {
  return gulp.src(files)
    .pipe(preprocess({
      context: {
        EXPORT: ''
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('black-es5.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-es6', function () {
  return gulp.src(files)
    .pipe(preprocess({
      context: {
        EXPORT: '',
        DEBUG: true
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('black-es6.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-es6-module', function () {
  return gulp.src(files)
    .pipe(preprocess({
      context: {
        EXPORT: 'export'
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('black-es6-module.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-examples', ['build-es6'], function () {
  return gulp.src('./dist/black-es6.*')
    .pipe(gulp.dest('../Blacksmith-Docs/node_modules/black/dist/'));
});

gulp.task('examples', ['build-es6'], function () {
  gulp.watch(['./src/**/*.js'], ['copy-examples']);
});

gulp.task('watch-es5', ['build-es5'], function () {
  gulp.watch(['./src/**/*.js'], ['build-es5']);
});

gulp.task('watch-es6', ['build-es6'], function () {
  gulp.watch(['./src/**/*.js'], ['build-es6']);
});

gulp.task('watch-es6-module', ['build-es6-module'], function () {
  gulp.watch(['./src/**/*.js'], ['build-es6-module']);
});

gulp.task('watch-test', ['build-es6'], function () {
  bs.init({
    server: {
      baseDir: './',
      directory: true,
      index: './test/index.html'
    },
    open: false
  });

  gulp.watch(['./src/**/*.js', './test/src/**/*.js'], ['build-es6']).on('change', bs.reload);
});

gulp.task('default', ['build-es5', 'build-es6', 'build-es6-module']);
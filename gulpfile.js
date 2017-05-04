'use strict';
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const template = require('gulp-template');
const rename = require('gulp-rename');
const jsdoc = require('gulp-jsdoc3');
const preprocess = require('gulp-preprocess');

const info = JSON.parse(fs.readFileSync('./build.json'));
const files = info.files;

browserSync.create();

gulp.task('examples', function() {});

gulp.task('examples-index', ['examples', 'build-es5'], function() {
  function walk(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory())
        results = results.concat(walk(file));
      else {
        if (file.indexOf('/examples/src/') >= 0)
          results.push(file)
      }
    })
    return results
  }

  let allfiles = walk('./examples/src/');

  let lis = '';
  let lastFolderName = null;
  for (let i = 0; i < allfiles.length; i++) {
    let f = allfiles[i];
    f = path.normalize(f);

    if (f.indexOf('.js') === -1)
      continue;

    let exampleName = path.basename(f, '.js');
    let folderName = path.basename(path.dirname(f));

    if (!lastFolderName || lastFolderName != folderName) {
      lis += '<h3>' + folderName + '</h3>';
      lastFolderName = folderName;
    }

    let url = 'src.' + folderName + '.' + exampleName;
    lis += '<li><a href="?id=' + url + '">' + exampleName + '</a></li>\n';
  }
  return gulp.src('./examples/src/index.template.html')
    .pipe(template({
      samples: lis
    }))
    .pipe(rename('/index.html'))
    .pipe(gulp.dest('./examples/'))
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

gulp.task('build-es5', function() {
  return gulp.src(files)
    .pipe(preprocess({context: { EXPORT: '' }}))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015']}))
    .pipe(concat('black-es5.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['examples-index'], function(cb) {
  browserSync.reload();
  cb();
});

gulp.task('watch', ['build-es5', 'examples-index'], function() {
  var options = {
    server: {
      baseDir: './',
      directory: true,
    },
    open: false
  };

  browserSync.init(options);
  gulp.watch(['./src/**/*.js', './examples/**/*.js'], ['js-watch']);
});

gulp.task('docs', function(cb) {
  var config = require('./.jsdoc.json');
  gulp.src(['README.md', './src/**/*.js'], {read: false})
  .pipe(jsdoc(config, cb));
});

//gulp.task('build', ['build-es5', 'build-es6', 'build-es6-module']);
gulp.task('default', ['examples-index', 'build-es5']);
gulp.task('bundle', ['examples-index', 'build-es5', 'build-es6', 'build-es6-module']);

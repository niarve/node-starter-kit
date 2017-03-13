'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    serve = require('gulp-serve'),
    ghPages = require('gulp-gh-pages'),
    clean = require('gulp-clean'),
    gih = require('gulp-include-html'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack');

gulp.task('js', () => {
  gulp.src('./src/js/app.js')
    .pipe(gulpWebpack({
      entry: [
        './src/js/app.js',
      ],
      output: {
        filename: 'app.bundle.js',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: 'node_modules', //add bower components later for jquery?
            loader: "babel-loader",
            query: {
              presets: ['es2015'],
              compact: false,
            }
          }
        ]
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()],
      }, webpack))
    .pipe(gulp.dest('dest/assets'))
    .pipe(connect.reload());
});

gulp.task('sass', () => {
  gulp.src('./src/sass/app.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest('dest/assets'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src(['./*.html', './views/*.html'])
    .pipe(gih({
      baseDir:'./views/',
      ignore:'./views/',
    }))
    .pipe(gulp.dest('dest'))
    .pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    root: ['dest'],
    port: 8080,
    livereload: true
  })
});

gulp.task('watch', () => {
  gulp.watch(['./*.html', './views/*.html'], ['html']);
  gulp.watch(['./src/sass/*.scss'], ['sass']);
  gulp.watch(['./src/js/*.js'], ['js']);
});

gulp.task('build', ['html', 'sass', 'js']);

gulp.task('serve', ['build'], serve('dest'));

// gulp.task('deploy', ['build'], function () {
//   gulp.src('./dest/**/*')
//     .pipe(ghPages({
//       remoteUrl: 'url to your gh page',
//       branch: 'master'
//     }))
// });

gulp.task('default', ['connect', 'watch', 'build']);

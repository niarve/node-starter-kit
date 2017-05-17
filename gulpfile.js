'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    serve = require('gulp-serve'),
    // ghPages = require('gulp-gh-pages'),
    // clean = require('gulp-clean'), unused
    gih = require('gulp-include-html'),
    gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack');

//this task handles all js, webpack, and bundles everything to one js file
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
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
              presets: ['es2015'],
              compact: false,
            }
          }
        ]
      },
      plugins: [new webpack.optimize.UglifyJsPlugin()], //uglify js
      }, webpack))
    .pipe(gulp.dest('dest/assets'))
    .pipe(connect.reload());
});

//task for sass, compiles everything to css file
gulp.task('sass', () => {
  gulp.src('./src/sass/app.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest('dest/assets'))
    .pipe(connect.reload());
});

//task handles turning all html pages in src/views/ to be usable in index.html
gulp.task('html', () => {
  gulp.src(['./*.html', './views/*.html'])
    .pipe(gih({
      baseDir:'./views/',
      ignore:'./views/',
    }))
    .pipe(gulp.dest('dest'))
    .pipe(connect.reload());
});

//livereload
gulp.task('connect', () => {
  connect.server({
    root: ['dest'],
    port: 8080,
    livereload: true
  })
});

//watch task, basically waits for you to make a change to one of the listed files
gulp.task('watch', () => {
  gulp.watch(['./*.html', './views/*.html'], ['html']);
  gulp.watch(['./src/sass/*.scss'], ['sass']);
  gulp.watch(['./src/js/*.js', './src/js/**/*.js'], ['js']);
});

gulp.task('build', ['html', 'sass', 'js']);

//use to test deployment artifact locally
gulp.task('serve', ['build'], serve('dest'));

// this task is used to deploy to your very own GitHub Page
// gulp.task('deploy', ['build'], function () {
//   gulp.src('./dest/**/*')
//     .pipe(ghPages({
//       remoteUrl: 'url to your gh page',
//       branch: 'master'
//     }))
// });

//default task, i.e. 'gulp' with no additional parameters
gulp.task('default', ['connect', 'watch', 'build']);

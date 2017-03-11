'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    serve = require('gulp-serve'),
    ghPages = require('gulp-gh-pages'),
    clean = require('gulp-clean'),
    gih = require('gulp-include-html');

gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest/assets'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('./src/sass/app.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(gulp.dest('dest/assets'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src(['./*.html', './views/*.html'])
    .pipe(gih({
      baseDir:'./views/',
      ignore:'./views/',
    }))
    .pipe(gulp.dest('dest'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: ['dest'],
    port: 8080,
    livereload: true
  })
});

gulp.task('watch', function () {
  gulp.watch(['./*.html', './templates/*.html'], ['html']);
  gulp.watch(['./src/styles/*.scss'], ['sass']);
  gulp.watch(['./src/scripts/*.js'], ['js']);
});

gulp.task('build', ['html', 'sass', 'js']);

gulp.task('serve', ['build'], serve('dest'));

// gulp.task('deploy', ['build'], function () {
//   gulp.src('./build/**/*')
//     .pipe(ghPages({
//     branch: 'master'
//     }))
// });

gulp.task('default', ['connect', 'watch', 'build']);

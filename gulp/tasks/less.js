/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var LessPluginCleanCss = require('less-plugin-clean-css');

var cleanCssPlugin = new LessPluginCleanCss();

gulp.task('less', function() {
  gulp.src('assets/less/*.less')
  .pipe(less({
    paths: [
      'assets/less'
    ]
  }))
  .pipe(gulp.dest('public/css'));
});

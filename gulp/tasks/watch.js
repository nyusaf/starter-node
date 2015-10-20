/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');

gulp.task('watch', function watchTask () {
  gulp.watch(['assets/less/**/*.less'], ['less']);
});
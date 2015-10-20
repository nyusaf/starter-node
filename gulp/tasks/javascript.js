/*jshint globalstrict: true*/
/*global require, console, __dirname*/

'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var requirejs = require('requirejs');
var root = path.join(__dirname, '../..');

var config = require(path.join(root, 'public/js/build.json'));

gulp.task('javascript', function (done) {

  gutil.log(gutil.colors.blue('Optimizing javascript using r.js ... wait for it'));

  requirejs.optimize(config, function optimizeSuccess (buildResponse) {
    gutil.log(gutil.colors.cyan('    r.js Optimizer built modules'));
    gutil.log(gutil.colors.cyan('============================================='));
    console.log(gutil.colors.green(buildResponse));
    gutil.log(gutil.colors.cyan('============================================='));
    done();
  }, function optimizeError (err) {
    console.log(err);
  });

});
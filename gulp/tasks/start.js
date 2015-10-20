/*jshint globalstrict: true*/
/*global require, process*/

'use strict';

var gulp = require('gulp');
var gulpNodemon = require('gulp-nodemon');
var path = require('path');
var chalk = require('chalk');

gulp.task('start', function () {
  gulpNodemon({
    script: 'server.js',
    ignore: [
      '.git',
      'node_modules',
      'bower_components'
    ],
    watch: [
      'public/templates/',
      'routes/',
      'lib/',
      'server.js'
    ],
    ext: 'hbs js',
    env: { 'NODE_ENV': 'development' }
  })
  .on('restart', function nodemonRestartHandler (files) {
    if (files) {
      process.stdout.write('\n');
      files.forEach(function (file) {
        process.stdout.write(chalk.yellow(' ○   ' + path.basename(file)) + '\n');
      }); // each
      process.stdout.write('\n');
    } else {
      process.stdout.write(chalk.green('\nApplication restarted manually\n'));
    }
  }); // on
});

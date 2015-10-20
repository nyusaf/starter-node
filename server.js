/*jshint globalstrict: true*/
/*global require, process*/

'use strict';

var express = require('express');
var app = express();

// setting up Express configuration
var setup = require('./lib/setup');
app = setup(app);

// setup routes
var router = require('./routes');

app.use('/', router);

app.listen(app.get('port'), function () {
  process.stdout.write('\n is running the ' + (process.env.NODE_ENV || 'development') + ' environment on port ' + app.get('port') + '\n\n');
});
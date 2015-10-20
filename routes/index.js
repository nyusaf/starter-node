/*jshint globalstrict: true*/
/*global module, require, __dirname, process*/

'use strict';

var path = require('path');
var root = path.join(__dirname, '..');
var env = process.env.NODE_ENV || 'development';
var pkg = require(path.join(root, 'package.json'));
var router = require('express').Router();

var routes = require('./routes');

//
//  Middleware for Routing
//

// Page Title
router.use(function setPageTitle (req, res, next) {
  res.locals.pageTitle = 'Page Title';
  next();
});

// Set environment var
router.use(function (req, res, next) {
  res.locals.prod = (env === 'production') ? true : false;
  res.locals.dev = (env === 'development') ? true : false;
  next();
});

// Asset base path
router.use(function (req, res, next) {
  var version = pkg.version;
  res.locals.assetBasePath = '';
  next();
});

router.use('/', routes);

module.exports = router;

/*jshint globalstrict: true*/
/*global module, require, __dirname*/

'use strict';

var path = require('path');
var root = path.join(__dirname, '..');
var debugkey = 'name:router:routes';
var log = require('debug')(debugkey);
var router = require('express').Router();
var api = require(path.join(root, '/lib/api'));

//
//  Middleware
//
router.use(function (req, res, next) {
  res.locals.pageTitle += ':: (Additional Title)';
  next();
});

//
//  Endpoint functions
//
function getMainPage (req, res) {
  res.render('index');
}

//
//  Routes
//
router.get('/', getMainPage);

module.exports = router;

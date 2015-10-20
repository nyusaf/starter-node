/*jshint globalstrict: true*/
/*global require, module, __dirname, process*/

'use strict';

//
//  File Paths
//
var path = require('path');
var root = path.join(__dirname, '..');
//
//  Web Server
//
var express = require('express');
var hbs = require('hbs');
//
//  Forms
//
var bodyParser = require('body-parser');
//
//  Logging
//
var morgan = require('morgan');
var mkdirp = require('mkdirp');
var fs = require('fs');
//
//  Env Vars
//
var env = process.env.NODE_ENV || 'development';
var port = 9999;
//
//  Setup Access Logging
//
morgan.token('headers', function (req) {
  var i, headers = [];

  for (i in req.headers) {
    headers.push(i + ':' + req.headers[i]);
  }

  return headers.join(',');
});
var productionLogFormat = ':method :: :url :: :headers :: :status :: :response-time';
var developmentLogFormat = 'tiny';
var logFormat = (env === 'production') ? productionLogFormat : developmentLogFormat;
mkdirp.sync(root + '/log'); // make log dir, if it doesn't exist
var acessLogStream = fs.createWriteStream(root + '/log/access.log', {flags: 'a+'});

module.exports = function expressAppSetup (app) {

  // Configure Express App
  app.set('port', (process.env.PORT || port));

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies

  app.use(express.static(path.join(root, 'public')));

  app.use(morgan(logFormat, { stream: acessLogStream }));

  // Handlebars
  app.set('view engine', 'hbs');
  app.set('views', path.join(root, 'public/templates'));
  app.set('view options', {layout: 'layouts/default.hbs'});

  hbs.registerPartials(root + '/public/templates/partials');

  // Handlebars Helpers
  var blocks = [];
  hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  });

  hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
  });

  return app;
};


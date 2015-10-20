/*jshint globalstrict: true*/
/*global module, require, __dirname */

'use strict';

var path = require('path');
var root = path.join(__dirname, '../..');
var log = require('debug')('name:utils');

var Q = require('q');
var request = require('request');
var assign = require('lodash.assign');

function flare (method, url, data) {
  log('[API ' + method + ' ' + url + ']');
  if (data) {
    log('with ' + JSON.stringify(data, null, 2));
  }
}

function reportError (res, err) {
  res.status(500).render('error', {
    layout: false,
    err:err
  });
}

function makeRequest (options) {
  var deferred = Q.defer();
  var opts = {
    method: 'GET',
    uri: '',
    json: true
  };
  var o = assign(opts, options);

  flare(o.method, o.uri);

  request(o, function (err, response, body) {
    if (err) {
      deferred.reject(err);
    }
    flare('RESPONDED to', o.uri, body);
    deferred.resolve(response);
  });

  return deferred.promise;
}

module.exports = {
  flare: flare,
  request: makeRequest,
  reportError: reportError
};
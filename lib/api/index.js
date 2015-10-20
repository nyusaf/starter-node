/*jshint globalstrict: true*/
/*global module, require, __dirname, process */

'use strict';

var path = require('path');
var root = path.join(__dirname, '../..');
var debugkey = 'name:api';
var log = require('debug')(debugkey);

var utils = require(path.join(root, 'lib/utils'));
var env = process.env.NODE_ENV || 'development';
var host = 'host';

function getSomething (arg) {
  var method = 'GET';
  var url = host;

  return utils.request({
    method: method,
    uri: url,
    json: true
  });
}

module.exports = {
  getSomething: getSomething
};

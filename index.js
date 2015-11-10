var jsonp = require('jsonp');
var qs    = require('query-string');

var prefix   = 'nominatim_callback_';
var BASE_URL = 'https://nominatim.openstreetmap.org/';

var cbCounter = 0;

function noop() {}

function geocode (options, callback, context) {
  callback = callback || noop;
  options = options || { q: '' };

  options.format = 'json';
  options.addressdetails = 1;

  var url = BASE_URL + 'search?' + qs.stringify(options);
  var name = options.callback || prefix + (cbCounter++);
  jsonp(url, { prefix: prefix, param: 'json_callback', name: name }, function () {
    callback.apply(context, arguments);
    if (name in global) global[name] = undefined;
  });
}

function reverse (options, callback, context) {
  callback = callback || noop;
  options = options || {};

  options.format = 'json';
  options.addressdetails = 1;

  var url = BASE_URL + 'reverse?' + qs.stringify(options);
  var name = options.callback || prefix + (cbCounter++);
  jsonp(url, { prefix: prefix, param: 'json_callback', name: name }, function () {
    callback.apply(context, arguments);
    if (name in global) global[name] = undefined;
  });
}

module.exports = { geocode: geocode, reverse: reverse };

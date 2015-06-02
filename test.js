'use strict';
var test = require('tape');
var Promise = global.Promise || require('lie');
var StreamPromise = require('./');

test('basic', function (t) {
  var stream = new StreamPromise();
  var ready = false;
  stream.on('finish', function () {
    t.ok(ready);
    t.end();
  });
  stream.write(Promise.resolve());
  stream.write(new Promise(function (fullfill) {
    setTimeout(function () {
      ready = true;
      fullfill();
    }, 20);
  }));
  stream.end(9);
});

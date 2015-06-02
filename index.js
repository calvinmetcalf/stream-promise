'use strict';
var Writable = require('io-stream').Writable;
var Promise = global.Promise || require('lie');
var inherits = require('inherits');

module.exports = StreamPromise;

inherits(StreamPromise, Writable);

function StreamPromise() {
  if (!(this instanceof StreamPromise)) {
    return new StreamPromise();
  }
  Writable.call(this, {
    objectMode: true
  });
}

StreamPromise.prototype._write = function (chunk, _, next) {
  Promise.resolve(chunk).then(function () {
    next();
  }, next);
};

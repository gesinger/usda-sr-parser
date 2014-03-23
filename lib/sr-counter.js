var stream = require('stream');
var util = require('util');

var Writable = stream.Writable;

var SrCounter = function() {
  this.count = 0;

  // allow use without new
  if (!(this instanceof SrCounter)) {
    return new SrCounter();
  }

  // init Writable
  Writable.call(this, { objectMode: true });
};
util.inherits(SrCounter, Writable);

SrCounter.prototype._write = function(chunk, enc, cb) {
  this.count++;
  cb();
};

module.exports = SrCounter;

var stream = require('stream');
var util = require('util');

var Writable = stream.Writable;

var InsertStream = function(db, table) {
  this.db = db;
  this.table = table;

  // allow use without new
  if (!(this instanceof InsertStream)) {
    return new InsertStream();
  }

  // init Writable 
  Writable.call(this, { objectMode: true });
};
util.inherits(InsertStream, Writable);

InsertStream.prototype._insertIntoSequelize = function(columns) {
};

InsertStream.prototype._write = function(chunk, enc, cb) {
  this._insertIntoSequelize(chunk);
  cb();
};

module.exports = InsertStream;

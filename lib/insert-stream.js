var stream = require('stream');
var util = require('util');

var Writable = stream.Writable;

var InsertStream = function(db, table) {
  this.db = db;
  this.table = table;
  this.numInsertions = 0;

  // allow use without new
  if (!(this instanceof InsertStream)) {
    return new InsertStream(db, table);
  }

  // init Writable 
  Writable.call(this, { objectMode: true });
};
util.inherits(InsertStream, Writable);

InsertStream.prototype._insertIntoSequelize = function(columns, cb) {
  var attributes = {};

  var i = 0;
  var dbField, dbValue;
  for (var tableColKey in this.table.columns) {
    dbField = this.table.columns[tableColKey];
    dbValue = columns[i];

    attributes[dbField] = dbValue;

    ++i;
  }

  this.db[this.table.name]
    .create(attributes)
    .complete(function(err, row) {
      if (!!err) {
        console.log('Error saving \'' + attributes + '\': ' + err);
      } else {
        ++this.numInsertions;
        cb();
      }
    }.bind(this));
};

InsertStream.prototype._write = function(chunk, enc, cb) {
  this._insertIntoSequelize(chunk, cb);
};

module.exports = InsertStream;

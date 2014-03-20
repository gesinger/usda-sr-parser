var sqlite3 = require('sqlite3');
var stream = require('stream');
var util = require('util');

var Writable = stream.Writable;

var SrDatabase = function(path) {
  this.db = new sqlite3.Database(path);

  Writable.call(this);
};
util.inherits(SrDatabase, Writable);

SrDatabase.prototype._write = function(chunk, enc, cb) {
  this.db.serialize((function() {
    console.log(chunk.toString());
    this.db.run(chunk.toString());
    cb();
  }).bind(this));
};

SrDatabase.prototype.runSerialized = function(query, cb) {
  this.db.serialize((function() {
    console.log(query);
    this.db.run(query);
    cb();
  }).bind(this));
};

SrDatabase.prototype._sqlType = function(type) {
  switch (type) {
    case 'boolean': return 'integer';
    default: return type;
  }
}

SrDatabase.prototype.prepareCreateTableQuery = function(tableConstant) {
  var query = 'CREATE TABLE ' + tableConstant.name + '(';
  var columns = tableConstant.columns;
  var i, column, querySegment;
  var primaryKeySegment = 'PRIMARY KEY (';
  for (i=0; i<columns.length; ++i) {
    column = columns[i];
    querySegment = column.name + ' ' + this._sqlType(column.type);
    if (column.hasOwnProperty('primaryKey')) {
      if (i != 0) {
        primaryKeySegment += ', ';
      }
      primaryKeySegment += column.name;
    }
    if (!column.canBeBlank) {
      querySegment += ' NOT NULL';
    }
    /* Foreign key support disabled for now
    if (column.hasOwnProperty('foreignKey')) {
      querySegment += ', FOREIGN KEY(' + column.name + ')';
      querySegment += ' REFERENCES ' + column.foreignKey.table + '(';
      querySegment += column.foreignKey.colName + ')';
    }
    */
    if (i != 0) {
      query += ', ';
    }
    query += querySegment;
  }
  primaryKeySegment += ')';
  query += ', ' + primaryKeySegment + ');';

  return query;
};

module.exports = SrDatabase;

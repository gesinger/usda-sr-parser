// TODO: remove (unused)

var sqlite3 = require('sqlite3').verbose();
//var TransactionDatabase = require('sqlite3-transactions').TransactionDatabase;
var stream = require('stream');
var util = require('util');

var Writable = stream.Writable;

var SrDatabase = function(path) {
  this.path = path ? path : ':memory:';
  this.streamedQueries = [];
  this.counter = 0;

  if (!SrDatabase.prototype.db) {
    //SrDatabase.prototype.rawDb = new sqlite3.Database(this.path);
    //SrDatabase.prototype.db = new sqlite3.Database(this.path);
    //SrDatabase.prototype.db = new sqlite3.Database('sr4.db');
    SrDatabase.prototype.db = new sqlite3.Database(this.path);
    //  new TransactionDatabase(SrDatabase.prototype.rawDb);
    //SrDatabase.prototype.rawDb = SrDatabase.prototype.db;// new sqlite3.Database(this.path);
  }

  Writable.call(this);
};
util.inherits(SrDatabase, Writable);

SrDatabase.prototype._write = function(chunk, enc, cb) {
  this.streamedQueries.push(chunk.toString());
  ++this.counter;
  if (this.counter === 10) {
    console.log(this.streamedQueries.join(''));
  }
  cb();
};

SrDatabase.prototype.runStreamedQueries = function(cb) {
  this.run(this.streamedQueries.join(''), cb);
};

SrDatabase.prototype.run = function(query, cb) {
  //console.log('Running: ' + query);
  this.db.serialize((function() {
    this.db.exec(query, function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      cb();
    });
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
  var primaryKeyPrefix = 'PRIMARY KEY (';
  var primaryKeySegment = primaryKeyPrefix;
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

  if (primaryKeySegment !== primaryKeyPrefix) {
    query += ', ' + primaryKeySegment + ')';
  }

  query += ');';

  return query;
};

module.exports = SrDatabase;

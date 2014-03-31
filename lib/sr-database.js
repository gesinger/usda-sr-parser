var sqlite3 = require('sqlite3');
var TransactionDatabase = require('sqlite3-transactions').TransactionDatabase;
var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

var SrDatabase = function(path) {
  this.path = path ? path : ':memory:';

  if (!SrDatabase.prototype.db) {
    //SrDatabase.prototype.rawDb = new sqlite3.Database(this.path);
    SrDatabase.prototype.rawDb = new sqlite3.Database(this.path);
    //  new TransactionDatabase(SrDatabase.prototype.rawDb);
  }

  Transform.call(this);
};
util.inherits(SrDatabase, Transform);

SrDatabase.prototype._transform = function(chunk, enc, cb) {
  this.run(chunk.toString(), (function() {
    this.push(chunk);
    cb();
  }).bind(this));
};

SrDatabase.prototype.run = function(query, cb) {
  SrDatabase.prototype.db.beginTransaction((function(err, transaction) {
    transaction.run(query);
    transaction.commit((function(err) {
      if (err) {
        console.log('Error with query: ' + query);
        console.log(err);
        throw err;
      }
      cb();
    }).bind(this));
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

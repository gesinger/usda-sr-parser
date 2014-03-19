var sqlite3 = require('sqlite3');
var srConstants = require('./sr-constants')

var sqlType = function(type) {
  switch (type) {
    case 'boolean':
      return 'integer';
    default:
      return type;
  }
}

var prepareCreateTableQuery = function(tableConstant) {
  var query = 'CREATE TABLE ' + tableConstant.name + '(';
  var columns = tableConstant.columns;
  var i, column, querySegment;
  var primaryKeySegment = 'PRIMARY KEY (';
  for (i=0; i<columns.length; ++i) {
    column = columns[i];
    querySegment = column.name + ' ' + sqlType(column.type);
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

  console.log('GENERATED QUERY: ' + query);
  return query;
};

var SrDatabase = function(path) {
  this.db = new sqlite3.Database(path);
};

SrDatabase.prototype.createTable = function(table) {
  this.db.serialize((function() {
    this.db.run(prepareCreateTableQuery(table));
  }).bind(this));
};

module.exports = SrDatabase;

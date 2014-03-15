var sqlite3 = require('sqlite3');
var srConstants = require('./sr-constants')

var prepareQuery = function(tableConstant) {
  var query = 'CREATE TABLE ' + tableConstant.name + '(';
  var columns = tableConstant.columns;
  var i, column, querySegment;
  for (i=0; i<columns.length; ++i) {
    column = columns[i];
    querySegment = column.name + ' ' + column.type;
    if (column.hasOwnProperty('primaryKey')) {
      querySegment += ' PRIMARY KEY';
    }
    if (!column.canBeBlank) {
      querySegment += ' NOT NULL';
    }
    if (column.hasOwnProperty('foreignKey')) {
      querySegment += ', FOREIGN KEY(' + column.name + ')';
      querySegment += ' REFERENCES ' + column.foreignKey.table + '(';
      querySegment += column.foreignKey.colName + ')';
    }
    if (i != 0) {
      query += ', ';
    }
    query += querySegment;
  }

  query += ');';

  return query;
};

console.log(prepareQuery(srConstants.FOOD_DESCRIPTION_TABLE));
console.log(prepareQuery(srConstants.FOOD_GROUP_DESCRIPTION_TABLE));
console.log(prepareQuery(srConstants.LANGUAL_FACTOR_TABLE));
console.log(prepareQuery(srConstants.LANGUAL_FACTORS_DESCRIPTION_TABLE));

var database = function(path) {
  // TODO add version
  var db = new sqlite3.Database('sr.db');

  db.serialize(function() {
    db.run('CREATE TABLE ndb (num)');
    db.parallelize(function() {
    });
  });
}

module.exports = database;

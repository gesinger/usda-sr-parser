var srConstants = require('./sr-constants');

exports.objectify = function(srDatabase, cb) {
  console.log('Objectifying DB: ' + srDatabase);

  var foods = [];

  var keyTable = srConstants.KEY_TABLE;

  var keyCol;
  var numCols = keyTable.columns.length;
  var i;
  for (i=0; i<numCols; ++i) {
    if (keyTable.columns[i].primaryKey) {
      keyCol = keyTable.columns[i].name;
      break;
    }
  }

  var selectKeysQuery = 'SELECT ' + keyCol + ' FROM ' + keyTable.name;
  srDatabase.db.each(selectKeysQuery, function(err, row) {
    if (err) {
      throw err;
    }

    foods.push(row);
  }, function(err, numRows) {
    if (err) {
      throw err;
    }

    var numFoodsRemaining = numRows;
    var markFoodComplete = function() {
      --numFoodsRemaining;

      if (numFoodsRemaining === 0) {
        cb(undefined, foods);
      }
    };

    foods.forEach(function(food) {
      var unhandledTables = [];
      var i;
      for (i=0; i<srConstants.TABLES.length; ++i) {
        unhandledTables.push(srConstants.TABLES[i]);
      }

      var handledTables = {};
      i=0;
      var table, primaryKeys, foreignKeys, col;
      var j;
      while (unhandledTables.length > 0) {
        // Wraparound if we get to the end
        if (i > unhandledTables.length - 1) {
          i = 0;
          break; // TODO remove
        }

        table = unhandledTables[i];

        primaryKeys = [];
        foreignKeys = [];

        for (j=0; j<table.columns.length; ++j) {
          col = table.columns[j];
          if (col.primaryKey) {
            primaryKeys.push(col);
          }
          if (col.foreignKey) {
            foreignKeys.push(col);
          }
        }

        var keySelectQueryPrefix = 'SELECT * FROM ';
        var keySelectQuerySuffix =
          ' WHERE ' + keyCol + '=\'' + food[keyCol] + '\'';
        var keySelectQuery =
          keySelectQueryPrefix + table.name + keySelectQuerySuffix;

        if (primaryKeys.length === 0) {
          // Making the assumption that if there are no primary keys, the table
          // still contains the keyCol's column, and we can base our selection
          // off of that
          (function(tableName) {
            srDatabase.db.all(keySelectQuery, function(err, rows) {
              if (err) {
                throw err;
              }
              food[tableName] = rows;
            });
          })(table.name);
        } else if (primaryKeys.length === 1) {
          if (primaryKeys[0].name === keyCol) {
            (function(tableName) {
              srDatabase.db.get(keySelectQuery, function(err, row) {
                if (err) {
                  throw err;
                }
                food[tableName] = row;
                markFoodComplete();
              });
            })(table.name);
          } else {
            // One primary key, not keyCol's primary key
            if (primaryKeys[0].foreignKey) {
            } else {
              // Do nothing here. These are tables that other tables will point
              // to, so we will pick it up when looking through the foreignKeys
            }
          }
        } else {
          // Multiple primary keys
        }

        ++i;
      }
    });

    //console.log('Retrieved ' + numRows + ' from ' + keyTable.name);
  });
};

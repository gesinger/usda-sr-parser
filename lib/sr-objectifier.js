var srConstants = require('./sr-constants');
var util = require('util');
var SrDatabase = require('./sr-database');

function resolveForeignKey(srDatabase, tableName, colName, value, cb) {
  var query =
    'SELECT * FROM ' + tableName
    + ' WHERE ' + colName + '=\'' + value + '\'';
  console.log('Mqking query: ');
  console.log(query);
  srDatabase.db.get(query, function(err, row) {
    console.log('QUERY HAS BEEN MADE!!!!');
    //cb('');
    //return;
    if (err) {
      console.log('query: ' + query);
      throw err;
    }

    var returnValue = {};

    var numColsRemaining = Object.keys(row).length;
    var markColDone = function() {
      //console.log('COLS REMAINING: ' + numColsRemaining);
      if (--numColsRemaining === 0) {
        //console.log('Finished resolving foreign key: ' + colName + ' - ' + value);
        cb(returnValue);
      }
    };

    var table = srConstants.NAME_TO_TABLE[tableName];
    var col;
    for (col in row) {
      console.log('Trying ' + col + ' to be ' + colName);
      if (col === colName) {
        markColDone();
        continue;
      }
      console.log(col + ' was ' + colName);

      var tableCol = getSrCol(table, col);

      if (table.topLevelTable && tableCol.foreignKey) {
        (function() {
          var col = col;
          console.log('SETTING COL TO: ' + col);
          resolveForeignKey(
            srDatabase,
            tableCol.foreignKey.table, tableCol.foreignKey.colName,
            row[col],
            function(resolved) {
              console.log('RESOLVED COL AS: ' + col);
              returnValue[col] = resolveForeignKey
              markColDone();
            });
        })();
      } else {
        returnValue[col] = row[col];
        markColDone();
      }
    }
  });
}

function getSrCol(table, colName) {
  var tableCols = table.columns;
  var col;
  for (col in tableCols) {
    if (tableCols[col].name === colName) {
      return tableCols[col];
    }
  }
}

function resolveRow(srDatabase, table, row, cb) {
  //console.log('Resolving row ' + row);

  var foreignKeyColsRemaining = 0;
  table.columns.forEach(function(column) {
    if (column.foreignKey) {
      ++foreignKeyColsRemaining;
    }
  });

  var markForeignKeyColResolved  = function() {
    console.log('Foreign key cols remaining: ' + foreignKeyColsRemaining);
    if (--foreignKeyColsRemaining === 0) {
    console.log('MADE IT!');
    console.log(row);
      cb(row);
    }
  };

  var col, tableCol;
  for (col in row) {
    tableCol = getSrCol(table, col);
    if (tableCol.foreignKey) {
      resolveForeignKey(
        srDatabase, table.name, col, row[col],
        function(resolvedForeignKeyVal) {
        row[col] = resolvedForeignKeyVal;
        markForeignKeyColResolved();
      });
    }
  }
}

function resolveRows(srDatabase, table, rows, cb) {
  //console.log('Resolving rows ' + rows);

  var resultRows = [];

  var numRowsRemaining = rows.length;
  var markRowResolved = function() {
    console.log('Rows remaining: ' + numRowsRemaining);
    if (--numRowsRemaining === 0) {
      cb(resultRows);
    }
  };

  rows.forEach(function(row) {
    resolveRow(srDatabase, table, row, function(resolvedRow) {
      console.log('RESOLVED ROW:');
      console.log(resolvedRow);
      resultRows.push(resolvedRow);
      markRowResolved();
    });
  });
}

function getFood(srDatabase, keyVal, cb) {
  var food = {};
  var keyTable = srConstants.KEY_TABLE;
  var keyCol = srConstants.KEY_COL;

  var tablesRemaining = srConstants.TOP_LEVEL_TABLES.length;
  var markTableResolved = function() {
    console.log('Tables remaining: ' + tablesRemaining);
    if (--tablesRemaining === 0) {
      cb(food);
    }
  };

  srConstants.TOP_LEVEL_TABLES.forEach(function(table) {
    if (table === keyTable) {
      var query =
        'SELECT * FROM ' + table.name +
        ' WHERE ' + keyCol.name + '=\'' + keyVal + '\'';
      srDatabase.db.get(query, function(err, row) {
        if (err) {
          throw err;
        }

        resolveRow(srDatabase, table, row, function(resolvedRow) {
          food[table.name] = resolvedRow;
          markTableResolved();
        });
      });
    } else {
      var query =
        'SELECT * FROM ' + table.name
        + ' WHERE ' + keyCol.name + '=\'' + keyVal + '\'';
      srDatabase.db.all(query, function(err, rows) {
        if (err) {
          throw err;
        }

        resolveRows(srDatabase, table, rows, function(resolvedRows) {
          food[table.name] = resolvedRows;
          markTableResolved();
        });
      });
    }
  });
}

exports.objectify = function(srDatabase, cb) {
  var keyTable = srConstants.KEY_TABLE;
  var keyCol   = srConstants.KEY_COL;

  foods = [];

  var selectKeysQuery = 'SELECT ' + keyCol.name + ' FROM ' + keyTable.name;
  console.log('Starting select all query');
  srDatabase.db.all(selectKeysQuery, function(err, rows) {
    if (err) {
      console.log('ERR: ' + err);
      throw err;
    }
    console.log('Finished select all query');
    console.log(rows);

    var numFoodsRemaining = rows.length;
    var markFoodConsumed = function() {
      console.log('Num foods remaining: ' + numFoodsRemaining);
      if (--numFoodsRemaining === 0) {
        cb(foods);
      }
    };

    rows.forEach(function(row) {
      var keyVal = row[srConstants.KEY_COL.name];
      console.log('Getting food: ' + keyVal);
      getFood(srDatabase, keyVal, function(food) {
        foods.push(food);
        markFoodConsumed();
      });
    });
  });
}

/*
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
  srDatabase.rawDb.each(selectKeysQuery, function(err, row) {
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
            rawDb.all(keySelectQuery, function(err, rows) {
              if (err) {
                throw err;
              }
              food[tableName] = rows;
            });
          })(table.name);
        } else if (primaryKeys.length === 1) {
          if (primaryKeys[0].name === keyCol) {
            (function(tableName) {
              srDatabase.rawDb.get(keySelectQuery, function(err, row) {
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
*/

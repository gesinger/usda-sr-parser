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

    console.log('Retrieved ' + numRows + ' from ' + keyTable.name);
    console.log(foods);
    cb(undefined, foods);
  });
};

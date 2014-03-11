var fs = require('fs');

module.exports = function(config, cb) {
  var filePath = config.filePath;
  var colNames = config.colNames;
  var colKeyNum = config.colKeyNum;

  function cleanCol(dirtyCol) {
    return dirtyCol
             .replace('\r', '')
             .replace(/^~/, '')
             .replace(/~$/, '');
  }

  function objectFromCols(cols, colNames) {
    var object = {};
    var i;
    for (i=0; i<colNames.length; ++i) {
      object[colNames[i]] = cols[i];
    }
    return object;
  }

  fs.readFile(filePath, function(err, data) {
    if (err) return cb(err) ;

    var result = {};

    var lines = data.toString().split("\n");
    lines.forEach(function(line) {
      var cols = line.toString().split("^");
      var cleanCols = [];
      cols.forEach(function(col) {
        cleanCols.push(cleanCol(col));
      });

      if (cleanCols[colKeyNum]) {
        result[cleanCols[colKeyNum]] = objectFromCols(cleanCols, colNames);
      }
    });

    cb(null, result);
  });
};

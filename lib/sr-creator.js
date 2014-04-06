var fs = require('fs');
var util = require('util');
var async = require('async');
var byline = require('byline');
var SrSplitterStream = require('./sr-splitter-stream');
var SrDatabase = require('./sr-database');
var srConstants = require('./sr-constants');
var SrInsertStream = require('./sr-insert-stream');
var SrCounter = require('./sr-counter');
var srObjectifier = require('./sr-objectifier');

var SrCreator = function(srDir) {
  this.srDir = srDir;
};

SrCreator.prototype.generate =
  function(dbPath, reuseDb, esExportPath, mappingsFilePath) {
  var runGenerateEsExport = function() {};
  if (esExportPath) {
    runGenerateEsExport = (function(srDatabase) {
      srObjectifier.objectify(srDatabase, function(foods) {
        console.log('FOODS: ');
        console.log(foods);
      });
    }).bind(this);
  }

  if (reuseDb) {
    if (esExportPath) {
      runGenerateEsExport(new SrDatabase(dbPath));
    }
  } else {
    this.generateSqliteDb(dbPath, function(srDatabase) {
      console.log('Database \'' + srDatabase.path + '\'ready');
      if (esExportPath) {
        runGenerateEsExport(srDatabase);
      }
    });
  }
};

SrCreator.prototype.generateSqliteDb = function(dbPath, cb) {
  console.log('Gnerating Sqlite DB at path: ' + dbPath);
  var numPipes = 0;
  srConstants.TABLES.forEach((function(table) {
    var srDatabase = new SrDatabase(dbPath);
    var createTableQuery = srDatabase.prepareCreateTableQuery(table);
    srDatabase.run(createTableQuery, (function() {
      var lineStream = byline.createStream(fs.createReadStream(this.srDir + table.fileName));
      var srSplitterStream = new SrSplitterStream();
      var srInsertStream = new SrInsertStream(table);
      //var srCounter = new SrCounter();

      lineStream.pipe(srSplitterStream).pipe(srInsertStream).pipe(srDatabase);//.pipe(srCounter);
      ++numPipes;

      srDatabase.on('finish', function() {
        console.log(table.name + ' done');
        --numPipes;
        if (numPipes === 0) {
          console.log('Running streamed queries');
          srDatabase.runStreamedQueries(function() {
            cb(srDatabase);
          });
        }
      });
    }).bind(this));
  }).bind(this));
};

SrCreator.prototype.generateEsExport = function(srDatabase, esExportPath, cb) {
  console.log('Generating Elasticsearch export at path: ' + esExportPath);
};

SrCreator.prototype.generateFood = function(srDatabase, food, cb)  {
  var foodGroupQuery =
    'SELECT * FROM FD_GROUP WHERE FdGrp_Cd=\'' + food.FdGrp_Cd + '\'';
  srDatabase.db.get(foodGroupQuery, function(err, row) {
    if (err) {
      cb(err);
    }
    food.FdGrp_Desc = row.FdGrp_Desc;
    cb(undefined, food);
  });
};

module.exports = SrCreator;

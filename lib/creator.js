var fs = require('fs');
var util = require('util');
var async = require('async');
var byline = require('byline');
var Db = require('./models');
var constants = require('./constants');
var SplitStream = require('./split-stream');
var InsertStream = require('./insert-stream');
var mappings = require('../config/mappings.json');

var SrCreator = function(srDir) {
  this.srDir = srDir;
  this.db;
};

SrCreator.prototype.fillDb = function (cb) {
  console.log('Filling db');

  var numPipes = 0;
  for (var tableKey in mappings) {
    var table = mappings[tableKey];
    ++numPipes;

    // Running under the assumption that the top level properties of the
    // mappings file are the same names as the file names
    var filePath = this.srDir + tableKey + '.txt';

    console.log('Parsing ' + filePath);

    var lineStream = byline.createStream(fs.createReadStream(filePath));
    var splitStream = new SplitStream();
    var insertStream = new InsertStream(this.db, table);

    lineStream.pipe(splitStream).pipe(insertStream);

    insertStream.on('finish', function() {
      console.log('Done parsing ' + filePath);

      --numPipes;
      if (numPipes === 0) {
        cb();
      }
    });
  }
};

SrCreator.prototype.resolveDb = function (dbPath, reuseDb, cb) {
  var resetDb = (reuseDb) ? false : true;

  this.db = new Db('sr', dbPath);
  this.db
    .sequelize
    .sync({ force: resetDb })
    .complete((function(err) {
      if (err) {
        console.log(err);
        throw err;
      }

      if (reuseDb) {
        console.log('Reusing db at ' + dbPath);
        cb();
      } else {
        this.fillDb(cb);
      }
    }).bind(this));
};

SrCreator.prototype.generate =
  function(dbPath, reuseDb, esExportPath, mappingsFilePath) {

  this.resolveDb(dbPath, reuseDb, (function() {
    if (esExportPath) {
      this.createEsExport(esExportPath);
    }
  }).bind(this));
};

SrCreator.prototype.createEsExport = function(path) {
  console.log('Generating ES export at path: ' + path);

  console.log(util.inspect(this.db));
  var foodDesModel = this.db[mappings['FOOD_DES'].name];
  foodDesModel.findAll().success(function(foodDescriptions) {
    console.log(foodDescriptions[0]);
  });
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

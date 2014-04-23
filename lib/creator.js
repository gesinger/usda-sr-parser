var fs = require('fs');
var util = require('util');
var async = require('async');
var byline = require('byline');
var Db = require('./models');
var SplitStream = require('./split-stream');
var InsertStream = require('./insert-stream');
var mappings = require('../config/mappings.json');

var SrCreator = function(srDir) {
  this.srDir = srDir;
  this.db;
};

SrCreator.prototype._fileToDb = function(fileKey, cb) {
  var table = mappings[fileKey];

  // Running under the assumption that the top level properties of the
  // mappings file are the same names as the file names
  var filePath = this.srDir + fileKey + '.txt';

  console.log('Parsing ' + filePath);

  var lineStream = byline.createStream(fs.createReadStream(filePath));
  var splitStream = new SplitStream();
  var insertStream = new InsertStream(this.db, table);

  lineStream.pipe(splitStream).pipe(insertStream);

  insertStream.on('finish', function() {
    console.log('Done parsing ' + filePath);
    cb();
  });
};

SrCreator.prototype.fillDb = function (cb) {
  console.log('Filling db');

  // Since there are foreign key contraints in the tables, we must
  // execute the jobs synchronously, and in a precise order.
  var files = [
    'FD_GROUP',
    'FOOD_DES'
  ];

  var checkAndConvertFiles = (function() {
    if (files.length > 0) {
      this._fileToDb(files.shift(), checkAndConvertFiles);
    } else {
      cb();
    }
  }).bind(this);

  checkAndConvertFiles();

/*
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

    (function(filePath) {
      insertStream.on('finish', function() {
        console.log('Done parsing ' + filePath);

        --numPipes;
        if (numPipes === 0) {
          cb();
        }
      });
    })(filePath);
  }
  */
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
      this.createEsExport(esExportPath, function() {
        console.log('Created ES export');
      });
    }
  }).bind(this));
};

SrCreator.prototype.createEsExport = function(path, cb) {
  console.log('Creating ES export at path: ' + path);

  var foods = [];

  var foodDesModel = this.db[mappings['FOOD_DES'].name];
  var fdGroupModel = this.db[mappings['FD_GROUP'].name];
  foodDesModel.findAll({
    include: [
      {
        model: fdGroupModel,
        as: 'foodGroup'
      }
    ]
  }).success(function(foodDescriptions) {
    console.log(foodDescriptions[0]);
    console.log(foodDescriptions[0].foodGroup);
    (function() {
      var food;
      for (var foodDescription in foodDescriptions) {
        //console.log(food);
        /*
        fdGroupModel.find({
          where: {
            // won't work in JSON
            //mappings['FD_GOUP'].columns['FdGrp_Cd']
          }
        }
        */
      }
    })();
  });
};

module.exports = SrCreator;

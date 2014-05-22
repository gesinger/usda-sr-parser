var fs = require('fs');
var async = require('async');
var byline = require('byline');
var Db = require('./models');
var SplitStream = require('./split-stream');
var InsertStream = require('./insert-stream');
var mappings = require('../config/mappings.json');
var Objectifier = require('./objectifier');
var Indexer = require('./indexer');
var ProgressBar = require('progress');

var SrCreator = function(srDir) {
  this.srDir = srDir;
  this.db;
};

SrCreator.prototype._fileToDb = function(fileKey, cb) {
  var table = mappings[fileKey];

  // Running under the assumption that the top level properties of the
  // mappings file are the same names as the file names
  var filePath = this.srDir + fileKey + '.txt';

  console.log('Parsing ' + filePath + '...');

  var lineStream = byline.createStream(fs.createReadStream(filePath));
  var splitStream = new SplitStream();
  var insertStream = new InsertStream(this.db, table);

  lineStream.pipe(splitStream).pipe(insertStream);

  var numLines = 0;
  var progressInterval;
  var progressBar;
  lineStream.on('data', function(chunk) {
    ++numLines;
  });
  lineStream.on('end', function() {
    var progressString =
      'and inserting '
      + ' [:bar] :percent (:current/:total) :etas';

    progressBar = new ProgressBar(progressString, {
      complete: '=',
      incomplete: ' ',
      width: 40,
      total: numLines
    });

    progressInterval = setInterval(function() {
      progressBar.update(insertStream.numInsertions/numLines);
    }, 500);
  });
  insertStream.on('finish', function() {
    progressBar.update(1);
    clearInterval(progressInterval);
    cb();
  });
};

SrCreator.prototype.fillDb = function (fillTables, cb) {
  console.log('Filling db');

  var files;
  if (fillTables) {
    files = fillTables;
  } else {
    // Since there are foreign key contraints in the tables, we must
    // execute the jobs synchronously, and in a precise order.
    files = [
      'LANGDESC',
      'FD_GROUP',
      'FOOD_DES',
      'LANGUAL',
      'SRC_CD',
      'DERIV_CD',
      'NUTR_DEF',
      'NUT_DATA',
      'WEIGHT',
      'FOOTNOTE',
      'DATA_SRC',
      'DATSRCLN'
    ];
  }

  var checkAndConvertFiles = (function() {
    if (files.length > 0) {
      this._fileToDb(files.shift(), checkAndConvertFiles);
    } else {
      cb();
    }
  }).bind(this);

  checkAndConvertFiles();
};

SrCreator.prototype.resolveDb = function (dbPath, reuseDb, fillTables, cb) {
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

      if (reuseDb && !fillTables) {
        console.log('Reusing db at ' + dbPath);
        cb();
      } else {
        this.fillDb(fillTables, cb);
      }
    }).bind(this));
};

SrCreator.prototype.generate = function(config) {
  this.resolveDb(config.dbPath, config.reuseDb, config.fillTables, (function() {
    if (config.esExportPath) {
      this.createEsExport(config.esExportPath, function() {
        console.log('Created ES export');
      });
    }
  }).bind(this));
};

SrCreator.prototype.createEsExport = function(path, cb) {
  console.log('Creating ES export at path: ' + path);

  var objectifier = new Objectifier(this.db);
  var indexer = new Indexer('http://localhost:9200');

  var progressString = '[:bar] :percent (:current/:total) :etas'
  var progressBar;

  objectifier.on('data', function(chunk) {
    if (!progressBar) {
      progressBar = new ProgressBar(progressString, {
        complete: '=',
        incomplete: ' ',
        width: 40,
        total: objectifier.getFoodDescriptionIds().length
      });
    }

    progressBar.tick(1);
  });

  objectifier.pipe(indexer);

  indexer.on('finish', function() {
    console.log('Created ES export');
  });
};

module.exports = SrCreator;

var fs = require('fs');
var util = require('util');
var async = require('async');
var byline = require('byline');
var SrSplitterStream = require('./sr-splitter-stream');
var SrDatabase = require('./sr-database');
var srConstants = require('./sr-constants');
var SrInsertStream = require('./sr-insert-stream');
var SrCounter = require('./sr-counter');

var SrCreator = function(srDir) {
  this.srDir = srDir;

  this.FOOD_DESCRIPTION_FILE            = srDir + '/FOOD_DES.txt';
  this.FOOD_GROUP_DESCRIPTION_FILE      = srDir + '/FD_GROUP.txt';
  this.LANGUAL_FACTOR_FILE              = srDir + '/LANGUAL.txt';
  this.LANGUAL_FACTORS_DESCRIPTION_FILE = srDir + '/LANGDESC.txt';
  this.NUTRIENT_DATA_FILE               = srDir + '/NUT_DATA.txt';
  this.NUTRIENT_DEFINITION_FILE         = srDir + '/NUTR_DEF.txt';
  this.SOURCE_CODE_FILE                 = srDir + '/SRC_CD.txt';
  this.DATA_DERIVATION_DESCRIPTION_FILE = srDir + '/DERIV_CD.txt';
  this.WEIGHT_FILE                      = srDir + '/WEIGHT.txt';
  this.FOOTNOTE_FILE                    = srDir + '/FOOTNOTE.txt';
  this.SOURCES_OF_DATA_LINK_FILE        = srDir + '/DATSRCLN.txt';
  this.SOURCES_OF_DATA_FILE             = srDir + '/DATA_SRC.txt';

  this.FOOD_DESCRIPTION_COL_NAMES = [
    'ndbNumber',
    'foodGroupCode',
    'longDescription',
    'shortDescription',
    'commonName',
    'manufacturerName',
    'isSurveyAvailable',
    'refuseDescription',
    'refusePercentage',
    'scientificName',
    'nitrogenFactor',
    'proteinFactor',
    'fatFactor',
    'carbFactor'
  ];
  this.FOOD_GROUP_DESCRIPTION_COL_NAMES = [
    'foodGroupCode',
    'foodGroupDescription'
  ];
  this.LANGUAL_FACTOR_COL_NAMES = [
    'ndbNumber',
    'factorCode'
  ];
  this.LANGUAL_FACTORS_DESCRIPTION_COL_NAMES = [
    'factorCode',
    'description'
  ];
  this.NUTRIENT_DATA_COL_NAMES = [
    'ndbNumber',
    'nutrientNumber',
    'nutrientValue',
    'numDataPoints',
    'standardError',
    'sourceCode',
    'derivationCode',
    'referenceNdbNumber',
    'isFortification',
    'numStudies',
    'minValue',
    'maxValue',
    'degreesOfFreedom',
    'lowErrorBound',
    'upperErrorBound',
    'statComments',
    'lastModifiedDate',
    'confidenceCode'
  ];
  this.NUTRIENT_DEFINITION_COL_NAMES = [
    'nutrientNumber',
    'unitOfMeasure',
    'tagName',
    'description',
    'numDecimalPlaces',
    'srOrder'
  ];
  this.SOURCE_CODE_COL_NAMES = [
    'sourceCode',
    'sourceCodeDescription'
  ];
  this.DATA_DERIVATION_DESCRIPTION_COL_NAMES = [
    'derivationCode',
    'derivationDescription'
  ];
  this.WEIGHT_COL_NAMES = [
    'ndbNumber',
    'sequenceNumber',
    'amount',
    'measureDescription',
    'gramWeight',
    'numDataPoints',
    'standardDeviation'
  ];
  this.FOOTNOTE_COL_NAMES = [
    'ndbNumber',
    'number',
    'type',
    'nutrientNumber',
    'text'
  ];
  this.SOURCES_OF_DATA_LINK_COL_NAMES = [
    'dataSourceID',
    'authors',
    'title',
    'year',
    'journal',
    'volumeOrCity',
    'issueState',
    'startPage',
    'endPage'
  ];
  this.SOURCES_OF_DATA_COL_NAMES = [
    'ndbNumber',
    'nutrientNumber',
    'dataSourceID'
  ];
};

SrCreator.prototype.generate =
  function(dbPath, esExportPath, mappingsFilePath) {
  this.generateSqliteDb(dbPath, function(srDatabase) {
    console.log('Database \'' + srDatabase.path + '\'ready');
    if (esExportPath) {
      this.generateEsExport(srDatabase, esExportPath, function() {
    }
    });
  });
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
      var srCounter = new SrCounter();

      lineStream.pipe(srSplitterStream).pipe(srInsertStream).pipe(srDatabase).pipe(srCounter);
      ++numPipes;

      srDatabase.on('end', function() {
        console.log(table.name + ': ' + srCounter.count);
        --numPipes;
        if (numPipes === 0) {
          cb(srDatabase);
        }
      });
    }).bind(this));
  }).bind(this));
};

SrCreator.prototype.generateEsExport = functioN(srDatabase, esExportPath, cb) {
  console.log('Generating Elasticsearch export at path: ' + esExportPath);
};

module.exports = SrCreator;

var util = require('util');
var async = require('async');
var srFileSplitter = require('./sr-file-splitter');
var SrDatabase = require('./sr-database');

var SrCreator = function(srDir) {
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

SrCreator.prototype.generateJSON = function() {
  /*
  this.createFileDataObject(function(err, data) {
    if (err) throw err;

    var result = {};
    Object.keys(data.foodDescriptions).forEach(function(key) {
      result[key] = data.foodDescriptions[key];
    });
    console.log(result);
  });
  */
  var srDatabase = new SrDatabase('sr.db');
};

SrCreator.prototype.createFileDataObject = function(callback) {
  var splitFoodDescriptions = function(callback) {
    srFileSplitter({
      filePath: this.FOOD_DESCRIPTION_FILE,
      colNames: this.FOOD_DESCRIPTION_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };
  var splitFoodGroupDescriptions = function(callback) {
    srFileSplitter({
      filePath: this.FOOD_GROUP_DESCRIPTION_FILE,
      colNames: this.FOOD_GROUP_DESCRIPTION_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };
  var splitLangualFactors = function(callback) {
    srFileSplitter({
      filePath: this.LANGUAL_FACTOR_FILE,
      colNames: this.LANGUAL_FACTOR_COL_NAMES,
      colKeyNum: 0 // TODO broken
    }, callback);
  };
  var splitLangualFactorDescriptions = function(callback) {
    srFileSplitter({
      filePath: this.LANGUAL_FACTORS_DESCRIPTION_FILE,
      colNames: this.LANGUAL_FACTORS_DESCRIPTION_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };
  var splitNutrientData = function(callback) {
    srFileSplitter({
      filePath: this.NUTRIENT_DATA_FILE,
      colNames: this.NUTRIENT_DATA_COL_NAMES,
      colKeyNum: 0 // TODO - broken
    }, callback);
  };
  var splitNutrientDefinition = function(callback) {
    srFileSplitter({
      filePath: this.NUTRIENT_DEFINITION_FILE,
      colNames: this.NUTRIENT_DEFINITION_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };
  var splitSourceCode = function(callback) {
    srFileSplitter({
      filePath: this.SOURCE_CODE_FILE,
      colNames: this.SOURCE_CODE_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };
  var splitDataDerivationDescription = function(callback) {
    srFileSplitter({
      filePath: this.DATA_DERIVATION_DESCRIPTION_FILE,
      colNames: this.DATA_DERIVATION_DESCRIPTION_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };
  var splitWeight = function(callback) {
    srFileSplitter({
      filePath: this.WEIGHT_FILE,
      colNames: this.WEIGHT_COL_NAMES,
      colKeyNum: 0 // TODO broken
    }, callback);
  };
  var splitFootnote = function(callback) {
    srFileSplitter({
      filePath: this.FOOTNOTE_FILE,
      colNames: this.FOOTNOTE_COL_NAMES,
      colKeyNum: 0 // TODO broken none
    }, callback);
  };
  var splitSourcesOfDataLink = function(callback) {
    srFileSplitter({
      filePath: this.SOURCES_OF_DATA_LINK_FILE,
      colNames: this.SOURCES_OF_DATA_LINK_COL_NAMES,
      colKeyNum: 0 // TODO broken 3
    }, callback);
  };
  var splitSourcesOfData = function(callback) {
    srFileSplitter({
      filePath: this.SOURCES_OF_DATA_FILE,
      colNames: this.SOURCES_OF_DATA_COL_NAMES,
      colKeyNum: 0
    }, callback);
  };

  async.parallel({
    foodDescriptions:          splitFoodDescriptions.bind(this),
    foodGroupDescriptions:     splitFoodGroupDescriptions.bind(this),
    langualFactors:            splitLangualFactors.bind(this),
    langualFactorDescriptions: splitLangualFactorDescriptions.bind(this),
    nutrientData:              splitNutrientData.bind(this),
    nutrientDefinition:        splitNutrientDefinition.bind(this),
    sourceCode:                splitSourceCode.bind(this),
    dataDerivationDescription: splitDataDerivationDescription.bind(this),
    weight:                    splitWeight.bind(this),
    footnote:                  splitFootnote.bind(this),
    sourcesOfDataLink:         splitSourcesOfDataLink.bind(this),
    sourcesOfData:             splitSourcesOfData.bind(this)
  }, callback);
};

module.exports = SrCreator;

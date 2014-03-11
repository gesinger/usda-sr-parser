var util = require('util');
var srFileSplitter = require('./sr-file-splitter');

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
  this.SOURCES_OF_DATA_FILE             = srDir + '/DATA_SRC.txt';
  this.SOURCES_OF_DATA_LINK_FILE        = srDir + '/DATSRCLN.txt';

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
  this.NUTIRENT_DEFINITION_COL_NAMES = [
  ];
  this.SOURCE_CODE_COL_NAMES = [
  ];
  this.DATA_DERIVATION_DESCRIPTION_COL_NAMES = [
  ];
  this.WEIGHT_COL_NAMES = [
  ];
  this.FOOTNOTE_COL_NAMES = [
  ];
  this.SOURCES_OF_DATA_COL_NAMES = [
  ];
  this.SOURCES_OF_DATA_LINK_COL_NAMES = [
  ];
};

SrCreator.prototype.generateJSON = function() {
  var foodDescriptions = srFileSplitter({
    filePath: this.FOOD_DESCRIPTION_FILE,
    colNames: this.FOOD_DESCRIPTION_COL_NAMES,
    colKeyNum: 0
  }, function(err, data) {
    if (err) throw err;

    console.log(util.inspect(data));
  });

  var foodGroupDescriptions = srFileSplitter({
    filePath: this.FOOD_GROUP_DESCRIPTION_FILE,
    colNames: this.FOOD_GROUP_DESCRIPTION_COL_NAMES,
    colKeyNum: 0
  }, function(err, data) {
    if (err) throw err;

    console.log(util.inspect(data));
  });

  var langualFactors = srFileSplitter({
    filePath: this.LANGUAL_FACTOR_FILE,
    colNames: this.LANGUAL_FACTOR_COL_NAMES,
    colKeyNum: 0
  }, function(err, data) {
    if (err) throw err;

    console.log(util.inspect(data));
  });

  var langualFactorDescriptions = srFileSplitter({
    filePath: this.LANGUAL_FACTORS_DESCRIPTION_FILE,
    colNames: this.LANGUAL_FACTORS_DESCRIPTION_COL_NAMES,
    colKeyNum: 0
  }, function(err, data) {
    if (err) throw err;

    console.log(util.inspect(data));
  });

  var nutrientData = srFileSplitter({
    filePath: this.NUTRIENT_DATA_FILE,
    colNames: this.NUTRIENT_DATA_COL_NAMES,
    colKeyNum: 0 // TODO - broken
  }, function(err, data) {
    if (err) throw err;

    console.log(util.inspect(data));
  });
};

module.exports = SrCreator;

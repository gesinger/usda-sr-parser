var commander = require('commander');
var util = require('util');
var srFileSplitter = require('./sr-file-splitter');

commander
  .version('0.0.1')
  .option('-d, --sr-dir <dir>', 'Path to SR directory')
  .option('-m, --mappings-file [file]', 'Path to mappings file')
  .parse(process.argv);

var srDir = commander.srDir;
if (!srDir) {
  commander.help();
}

// TODO _ other file

var FOOD_DESCRIPTION_FILE            = srDir + '/FOOD_DES.txt';
var FOOD_GROUP_DESCRIPTION_FILE      = srDir + '/FD_GROUP.txt';
var LANGUAL_FACTOR_FILE              = srDir + '/LANGUAL.txt';
var LANGUAL_FACTORS_DESCRIPTION_FILE = srDir + '/LANGDESC.txt';
var NUTRIENT_DATA_FILE               = srDir + '/NUT_DATA.txt';
var NUTRIENT_DEFINITION_FILE         = srDir + '/NUTR_DEF.txt';
var SOURCE_CODE_FILE                 = srDir + '/SRC_CD.txt';
var DATA_DERIVATION_DESCRIPTION_FILE = srDir + '/DERIV_CD.txt';
var WEIGHT_FILE                      = srDir + '/WEIGHT.txt';
var FOOTNOTE_FILE                    = srDir + '/FOOTNOTE.txt';
var SOURCES_OF_DATA_FILE             = srDir + '/DATA_SRC.txt';
var SOURCES_OF_DATA_LINK_FILE        = srDir + '/DATSRCLN.txt';

var FOOD_DESCRIPTION_COL_NAMES = [
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
var FOOD_GROUP_DESCRIPTION_COL_NAMES = [
  'foodGroupCode',
  'foodGroupDescription'
];
var LANGUAL_FACTOR_COL_NAMES = [
  'ndbNumber',
  'factorCode'
];
var LANGUAL_FACTORS_DESCRIPTION_COL_NAMES = [
  'factorCode',
  'description'
];
var NUTRIENT_DATA_COL_NAMES = [
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
var NUTIRENT_DEFINITION_COL_NAMES = [
];
var SOURCE_CODE_COL_NAMES = [
];
var DATA_DERIVATION_DESCRIPTION_COL_NAMES = [
];
var WEIGHT_COL_NAMES = [
];
var FOOTNOTE_COL_NAMES = [
];
var SOURCES_OF_DATA_COL_NAMES = [
];
var SOURCES_OF_DATA_LINK_COL_NAMES = [
];

var foodDescriptions = srFileSplitter({
  filePath: FOOD_DESCRIPTION_FILE,
  colNames: FOOD_DESCRIPTION_COL_NAMES,
  colKeyNum: 0
}, function(err, data) {
  if (err) throw err;

  console.log(util.inspect(data));
});

var foodGroupDescriptions = srFileSplitter({
  filePath: FOOD_GROUP_DESCRIPTION_FILE,
  colNames: FOOD_GROUP_DESCRIPTION_COL_NAMES,
  colKeyNum: 0
}, function(err, data) {
  if (err) throw err;

  console.log(util.inspect(data));
});

var langualFactors = srFileSplitter({
  filePath: LANGUAL_FACTOR_FILE,
  colNames: LANGUAL_FACTOR_COL_NAMES,
  colKeyNum: 0
}, function(err, data) {
  if (err) throw err;

  console.log(util.inspect(data));
});

var langualFactorDescriptions = srFileSplitter({
  filePath: LANGUAL_FACTORS_DESCRIPTION_FILE,
  colNames: LANGUAL_FACTORS_DESCRIPTION_COL_NAMES,
  colKeyNum: 0
}, function(err, data) {
  if (err) throw err;

  console.log(util.inspect(data));
});

var nutrientData = srFileSplitter({
  filePath: NUTRIENT_DATA_FILE,
  colNames: NUTRIENT_DATA_COL_NAMES,
  colKeyNum: 0 // TODO - broken
}, function(err, data) {
  if (err) throw err;

  console.log(util.inspect(data));
});

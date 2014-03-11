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

var FOOD_DESCRIPTION_FILE            = srDir + '/FOOD_DES.txt';
var NUTRIENT_DATA_FILE               = srDir + '/NUT_DATA.txt';
var WEIGHT_FILE                      = srDir + '/WEIGHT.txt';
var FOOTNOTE_FILE                    = srDir + '/FOOTNOTE.txt';
var FOOD_DESCRIPTION_FILE            = srDir + '/FOOD_DES.txt';
var FOOD_GROUP_DESCRIPTION_FILE      = srDir + '/FD_GROUP.txt';
var LANGUAL_FACTOR_FILE              = srDir + '/LANGUAL.txt';
var LANGUAL_FACTORS_DESCRIPTION_FILE = srDir + '/LANGDESC.txt';
var NUTRIENT_DEFINITION_FILE         = srDir + '/NUTR_DEF.txt';
var SOURCE_CODE_FILE                 = srDir + '/SRC_CD.txt';
var DATA_DERIVATION_DESCRIPTION_FILE = srDir + '/DERIV_CD.txt';
var SOURCES_OF_DATA_FILE             = srDir + '/DATA_SRC.txt';
var SOURCES_OF_DATA_LINK_FILE        = srDir + '/DATSRCLN.txt';

var foodDescriptions = srFileSplitter(
  FOOD_DESCRIPTION_FILE,
  ['ndbNumber', 'foodGroupCode', 'longDescription'],
  0, function(err, data) {
  if (err) throw err;

  console.log(util.inspect(data));
});


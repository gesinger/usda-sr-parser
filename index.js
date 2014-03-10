var commander = require('commander');

commander
  .version('0.0.1')
  .option('-d, --dir <dir>', 'Path to SR directory')
  .parse(process.argv);

if (!commander.dir) {
  commander.help();
}

console.log(commander.dir);

var FOOD_DESCRIPTION_FILE            = commander.dir + '/FOOD_DES.txt';
var NUTRIENT_DATA_FILE               = commander.dir + '/NUT_DATA.txt';
var WEIGHT_FILE                      = commander.dir + '/WEIGHT.txt';
var FOOTNOTE_FILE                    = commander.dir + '/FOOTNOTE.txt';
var FOOD_DESCRIPTION_FILE            = commander.dir + '/FOOD_DES.txt';
var FOOD_GROUP_DESCRIPTION_FILE      = commander.dir + '/FD_GROUP.txt';
var LANGUAL_FACTOR_FILE              = commander.dir + '/LANGUAL.txt';
var LANGUAL_FACTORS_DESCRIPTION_FILE = commander.dir + '/LANGDESC.txt';
var NUTRIENT_DEFINITION_FILE         = commander.dir + '/NUTR_DEF.txt';
var SOURCE_CODE_FILE                 = commander.dir + '/SRC_CD.txt';
var DATA_DERIVATION_DESCRIPTION_FILE = commander.dir + '/DERIV_CD.txt';
var SOURCES_OF_DATA_FILE             = commander.dir + '/DATA_SRC.txt';
var SOURCES_OF_DATA_LINK_FILE        = commander.dir + '/DATSRCLN.txt';

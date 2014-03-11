var commander = require('commander');
var SrCreator = require('./lib/sr-creator');

commander
  .version('0.0.1')
  .option('-d, --sr-dir <dir>', 'Path to SR directory')
  .option('-m, --mappings-file [file]', 'Path to mappings file')
  .parse(process.argv);

var srDir = commander.srDir;
if (!srDir) {
  commander.help();
}

var creator = new SrCreator(srDir);
creator.generateJSON();

var commander = require('commander');
var creator = require('./lib/creator');

commander
  .version('0.0.1')
  .option('-d, --sr-dir <dir>', 'Path to SR directory')
  .option('-s, --sqlite-db [file]', 'Path to create or re-use sqlite DB')
  .option('-r, --reuse-db', 'Re-use (don\'t create) the provided sqlite DB')
  .option('-e, --es-export [file]', 'Path to create elasticsearch export')
  .option('-m, --mappings-file [file]', 'Path to mappings file')
  .parse(process.argv);

var srDir = commander.srDir;
if (!srDir) {
  commander.help();
}

var creator = new creator(srDir);
creator.generate(
  commander.sqliteDb,
  commander.reuseDb,
  commander.esExport,
  commander.mappingsFile);

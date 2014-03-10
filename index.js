var commander = require('commander');

commander
  .version('0.0.1')
  .option('-d, --dir <dir>', 'Path to SR directory')
  .parse(process.argv);

if (!commander.dir) {
  commander.help();
}

console.log(commander.dir);

var commander = require('commander');

commander
  .version('0.0.1')
  .option('-d, --dir', 'Path to SR directory')
  .parse(process.argv);

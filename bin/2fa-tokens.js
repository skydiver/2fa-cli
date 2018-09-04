const program = require('commander');
const helpers = require('../lib/helpers');
const tokens = require('../commands/tokens');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .command('browse')
  .description('Browse your accounts')
  .action(() => tokens
    .browse()
    .catch(helpers.handleError));

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
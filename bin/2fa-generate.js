const program = require('commander');
const helpers = require('../lib/helpers');
const tokens = require('../commands/tokens');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .arguments('<account>')
  .action((account) => tokens
    .generate(account, true)
    .catch(helpers.handleError));

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
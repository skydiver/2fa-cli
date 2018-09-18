const program = require('commander');
const helpers = require('../lib/helpers');
const accounts = require('../commands/accounts');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .command('add')
  .description('Add your 2FA account secret')
  .action(() => accounts
    .add()
    .catch(helpers.handleError));

program
  .command('remove')
  .description('Remove 2FA account')
  .action(() => accounts
    .remove()
    .catch(helpers.handleError));

program
  .command('list')
  .description('List your accounts')
  .action(() => accounts
    .list()
    .catch(helpers.handleError));

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
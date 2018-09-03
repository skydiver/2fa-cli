const program = require('commander');
const helpers = require('../lib/helpers');
const alfred = require('../commands/alfred');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .command('search <query>')
  .description('Search accounts and return in Alfred Workflow format')
  .action((query) => alfred
    .search(query)
    .catch(helpers.handleError));

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
const program = require('commander');
const helpers = require('../lib/helpers');
const alfred = require('../commands/alfred');
const pkg = require('../package.json');

program
  .version(pkg.version);

program
  .command('install')
  .description('Install Alfred Workflow')
  .action(() => alfred
    .install()
    .catch(helpers.handleError));

program
  .command('uninstall')
  .description('Uninstall Alfred Workflow')
  .action(() => alfred
    .uninstall()
    .catch(helpers.handleError));

program
  .command('search <query>')
  .description('Used by Alfred Workflow')
  .action((query) => alfred
    .search(query)
    .catch(helpers.handleError));

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
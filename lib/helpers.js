const chalk = require('chalk');

const handleError = (message) => {
  console.error(chalk.redBright(message));
  process.exitCode = 1;
};

const extractName = (pkgName) => pkgName.substr(pkgName.indexOf('/') + 1);

const notEmpty = (input) => input === '' ? 'This value is required' : true;

const tableHeader = (text) => chalk.green(text);
const tableRow = (text) => chalk.white(text);

const stringSuccess = (text) => console.log(chalk.green(text));
const stringWarning = (text) => console.log(chalk.yellow(text));
const stringBold = (string) => chalk.bold(string);

module.exports = {
  extractName,
  handleError,
  notEmpty,
  stringSuccess,
  stringWarning,
  stringBold,
  tableHeader,
  tableRow,
};
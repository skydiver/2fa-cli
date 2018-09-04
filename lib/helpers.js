const chalk = require('chalk');
const pkg = require('../package.json');

const handleError = (message) => {
  console.error(chalk.redBright(message));
  process.exitCode = 1;
};

const packgName = () => pkg.name.substr(pkg.name.indexOf('/') + 1);
const packageName = packgName();

const notEmpty = (input) => input === '' ? 'This value is required' : true;

const tableHeader = (text) => chalk.green(text);
const tableRow = (text) => chalk.white(text);

const stringSuccess = (text) => console.log(chalk.green(text));
const stringWarning = (text) => console.log(chalk.yellow(text));
const stringBold = (string) => chalk.bold(string);

const stringSplit = (string) => {
  if (string === '') {
    return string;
  }
  const text = `${string}`;
  const half = Math.ceil(text.length / 2);
  return `${text.substring(0, half)} ${text.substring(half)}`;
};

module.exports = {
  packageName,
  handleError,
  notEmpty,
  stringBold,
  stringSuccess,
  stringWarning,
  stringSplit,
  tableHeader,
  tableRow,
};
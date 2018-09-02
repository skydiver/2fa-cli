const inquirer = require('inquirer');
const helpers = require('../lib/helpers');
const { table } = require('../lib/table');
const Settings = require('../lib/settings');
const pkg = require('../package.json');


const packageName = helpers.extractName(pkg.name);

const add = async () => {
  const settings = new Settings(packageName);
  const accounts = await settings.readParameter('accounts') || {};
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'account',
      message: 'Enter your account name:',
      validate: helpers.notEmpty
    },
    {
      type: 'input',
      name: 'secret',
      message: 'Enter your account secret:',
      validate: helpers.notEmpty
    }
  ]);
  accounts[answers.account] = {
    secret: answers.secret
  };
  await settings.storeParam('accounts', accounts);
  helpers.stringSuccess('Account secret successfully stored.');
};

const remove = async () => {
  const settings = new Settings(packageName);
  const accounts = await settings.readParameter('accounts') || {};
  if (Object.keys(accounts).length === 0) {
    throw new Error('There is no stored accounts.');
  }
  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'account',
    message: 'Select the account to remove:',
    choices: Object.keys(accounts)
  }]);
  settings.clearParam(`accounts.${answers.account}`);
  helpers.stringSuccess(`Account ${answers.account} was successfully removed.`);
};

const list = async () => {
  const settings = new Settings(packageName);
  const accounts = await settings.readParameter('accounts') || {};
  const tbl = table(['Accounts'], Object.keys(accounts));
  console.log(tbl.toString());
};


const configure = { add, remove, list };

module.exports = configure;
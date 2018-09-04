const inquirer = require('inquirer');
const helpers = require('../lib/helpers');
const Settings = require('../lib/settings');

const selector = async () => {
  const settings = new Settings(helpers.packageName);
  const accounts = await settings.readParameter('accounts');
  if (!accounts) {
    throw new Error('There is no stored accounts.');
  }
  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'account',
    message: 'Select the account to remove:',
    choices: Object.keys(accounts)
  }]);
  const account = await settings.readParameter(`accounts.${answers.account}`);
  return {
    name: answers.account,
    secret: account.secret
  };
};

module.exports = { selector };
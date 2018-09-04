const otplib = require('otplib');
const helpers = require('../lib/helpers');
const { table } = require('../lib/table');
const Settings = require('../lib/settings');
const { selector } = require('../lib/accounts');

const browse = async () => {
  const account = await selector();
  const token = otplib.authenticator.generate(account.secret);
  const output = `${account.name}\n\n${helpers.stringSplit(token)}`;
  const tbl = table([], [helpers.stringBold(output)]);
  console.log(tbl.toString());
};

const generate = async (account) => {
  const settings = new Settings(helpers.packageName);
  const acc = await settings.readParameter(`accounts.${account}`);
  if (!acc) {
    helpers.stringWarning(`Warning: account ${account} doesn't exists.`);
    process.exit(1);
  }
  const token = otplib.authenticator.generate(acc.secret);
  console.log(token);
};

module.exports = { browse, generate };
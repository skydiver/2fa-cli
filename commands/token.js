const otplib = require('otplib');
const helpers = require('../lib/helpers');
const { table } = require('../lib/table');
const Settings = require('../lib/settings');
const pkg = require('../package.json');


const packageName = helpers.extractName(pkg.name);

const generate = async (account) => {
  const settings = new Settings(packageName);
  const acc = await settings.readParameter(`accounts.${account}`);
  if (!acc) {
    helpers.stringWarning(`Warning: account ${account} doesn't exists.`);
  }
  const token = otplib.authenticator.generate(acc.secret);
  const output = `${helpers.stringBold(token.substring(0, 3))} ${helpers.stringBold(token.substring(3))}`;
  const tbl = table([], [` TOKEN\n\n${output}`]);
  console.log(tbl.toString());
};


const configure = { generate };

module.exports = configure;
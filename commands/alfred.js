const Fuse = require('fuse.js');
const helpers = require('../lib/helpers');
const Settings = require('../lib/settings');
const pkg = require('../package.json');


const packageName = helpers.extractName(pkg.name);

const fuzzy = (query, rows) => {
  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['account']
  };
  const fuse = new Fuse(rows, options);
  return fuse.search(query);
};

const search = async (query) => {
  const alfy = require('alfy');
  const settings = new Settings(packageName);
  const accounts = await settings.readParameter('accounts');
  let result = Object.keys(accounts).map(function(key) {
    return { account: key };
  });
  if (query.trim() !== '') {
    result = fuzzy(query, result);
  }
  const output = [];
  result.forEach(acc => {
    output.push({
      title: acc.account,
      body: acc.account,
      arg: acc.account,
      icon: {
        path: `./icons/${acc.account.toLowerCase()}.png`
      }
    });
  });
  alfy.output(output);
};


const configure = { search };

module.exports = configure;
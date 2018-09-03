const Fuse = require('fuse.js');
const alfy = require('alfy');
const helpers = require('../lib/helpers');
const Settings = require('../lib/settings');
const pkg = require('../package.json');


const packageName = helpers.extractName(pkg.name);

const search = async (query) => {
  const settings = new Settings(packageName);
  const accounts = await settings.readParameter('accounts');
  const searchObject = Object.keys(accounts).map(function(key) {
    return { account: key };
  });
  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['account']
  };
  const fuse = new Fuse(searchObject, options);
  const result = fuse.search(query);
  const output = [];
  result.forEach(acc => {
    output.push({
      title: acc.account,
      body: acc.account,
      arg: acc.account,
      icon: {
        path: `./icons/${acc.account}.png`
      }
    });
  });
  alfy.output(output);
};


const configure = { search };

module.exports = configure;
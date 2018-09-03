#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('generate', 'Generate token for supplied account')
  .command('tokens', 'Generate tokens for your accounts')
  .command('accounts', 'Manage your 2FA accounts')
  .command('alfred', 'Use your accounts with Alfred Workflows')
  .parse(process.argv);
#! /usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('token', 'Generate tokens')
  .command('accounts', 'Manage your 2FA accounts')
  .parse(process.argv);
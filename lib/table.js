const Table = require('cli-table');
const { tableHeader } = require('./helpers');


const buildHeaders = (_headers) => {
  const head = [];
  _headers.forEach(element => {
    head.push(tableHeader(element));
  });
  return head;
};

const table = (headers, rows) => {
  const tbl = new Table({ head: buildHeaders(headers) });
  rows.sort();
  rows.forEach(element => {
    tbl.push([element]);
  });
  return tbl;
};

module.exports = { table };
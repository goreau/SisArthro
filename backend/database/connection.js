require('dotenv').config();

const moment = require('moment');
const { setTypeParser, builtins } = require('pg').types;

setTypeParser(builtins.DATE, val => moment(val).format('YYYY-MM-DD'));
setTypeParser(builtins.TIME, val => moment(val).format('HH:mm:ss'));
setTypeParser(builtins.TIMETZ, val => moment(val).format('HH:mm:ss'));
setTypeParser(builtins.TIMESTAMP, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
setTypeParser(builtins.TIMESTAMPTZ, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : '10.8.150.26',
      port: 5432,
      user : 'postgres',
      password : 'AHag654321',
      database : 'sisarthro'
    }
  });

module.exports = knex
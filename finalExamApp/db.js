'use strict';

require('dotenv').config();
const pg = require('pg');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
client.on('error', err => console.error(err));
client.connect();

client.query('CREATE DATABASE finals')
  .then(() => {
    client.query('DROP TABLE IF EXISTS pokemon')
      .then(() => {
        client.query('CREATE TABLE pokemon ( id serial primary key, name varchar(255)')
      })
  });


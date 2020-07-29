'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
require('ejs');
const pg = require('pg');


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

console.log(process.env.DATABASE_URL)

const client = new pg.Client({connectionString:process.env.DATABASE_URL});
client.on('error', err => console.error(err));

app.get('/', getPoki);
app.post('/add', addPoki);
app.get('/favorites', getFavorites);

function getPoki(req, res){
  superagent.get('https://pokeapi.co/api/v2/pokemon')
    .then(results => {
      let sortedResults = results.body.results.sort((a, b) => a.name > b.name ? 1 : -1);
      res.render('./show.ejs', {poki: sortedResults});
    })
}

function addPoki(request, res){
  let name = request.body.name;
  let sql = `INSERT INTO pokimon (name) VALUES ($1) returning ID;`;

  let safeValues = [name];

  client.query(sql, safeValues)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.error(err))
}

function getFavorites(req, res){
  let sql = 'SELECT * FROM pokimon;';
  client.query(sql)
    .then(results => {
      res.render('./favorites', {poki: results.rows});
    })
    .catch(err => console.log(err))
}

client.connect()
  .then(() => {
    app.listen(3002, () => console.log(`listening on 3002`));
  })
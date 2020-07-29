'use strict';

const request = require('supertest');
/*
-------------------------------------------------------------------
Build a simple express server.
  - Connect a '/hello' route that sends a greeting of your  choice.
  - Connect a '/aboutme' route that sends a short bio about you to the front-end.
  - Connect a '/favoritefoods' route that sends an array containing your favorite foods.
  - All other routes should respond with a status of 404.

NOTE: You do not need write the app.listen() code for your server
      The test do this for you
-------------------------------------------------------------------
*/

const createServer = () => {
  const express = require('express');
  const app = express();

  // Solution code here...
  app.get('/hello', (req, res) => res.status(200).send('hi'));
  app.get('/aboutme', (req, res) => res.status(200).send('hi'));
  app.get('/favoritefoods', (req, res) => res.status(200).json(['apples', 'meat']));
  app.use('*', (req, res) => res.status(404).send('no'));

  return app;
};


///////////////////////////////////////////////////
// TESTS
///////////////////////////////////////////////////

describe('Testing challenge', () => {

  let server = createServer();

  it('responds to /hello', function testSlash() {
    return request(server)
      .get('/hello')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toBeDefined();
      })
  });

  it('responds to /aboutme', function testAbout() {
    return request(server)
      .get('/aboutme')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toBeDefined();
      })
  });

  it('responds to /favoritefoods', function testFood() {
    return request(server)
      .get('/favoritefoods')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(1);
      })
  });

  test('responds to /foo', function testNotFound() {
    return request(server)
      .get('/foo')
      .then(response => {
        expect(response.status).toEqual(404);
      })
  });
});

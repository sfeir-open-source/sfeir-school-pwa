'use strict';

const express = require('express');
const api = require('./api');
const prpl = require('prpl-server');
const path = require('path');

const app = express();

app.use('/api', api);

app.set('port', process.env.PORT || 8080);

// PRPL Server
const prplConfig = require('./build/polymer.json');
app.get('/*', prpl.makeHandler(path.join(__dirname, '/build'), prplConfig));

app.listen(app.get('port'), function() {
  console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});

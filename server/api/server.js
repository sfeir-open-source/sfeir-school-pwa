'use strict';

const express = require('express');
const route = require('./index');

const app = express();

app.use('/api', route);

app.set('port', process.env.PORT || 9000);

app.listen(app.get('port'), function() {
  console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});

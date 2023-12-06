// server.js
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../../assets/mocks/people.json'));
const middlewares = jsonServer.defaults();
const SignClassic = require('./auth-classic');
const WebAuthServer = require('./auth-webauth');
const Auth = require('./auth');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);

// We will memorize logged users in memory
const loggedUsers = [];
// Create the auth instance with the logged users
const authInstance = new Auth(loggedUsers);

// Activate classic Authenticated endpoints
new SignClassic(authInstance, server);

// Activate WebAuth Authenticated endpoints
new WebAuthServer(authInstance, server);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});

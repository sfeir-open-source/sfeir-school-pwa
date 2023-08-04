const path = require('path');
// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../../assets/mocks/people.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);

// We will memorize logged users in memory
const loggedUsers = [];

// Add custom routes before JSON Server router
server.post('/auth/signup', (req, res) => {
  console.log('Signup', req.body);
  if (req.body.username !== '' && req.body.password !== '') {
    let user = loggedUsers.find(user => user.username === req.body.username);
    // If user already exists, we update the passwords
    if (user) {
      user.password = req.body.password;
    } else {
      user = req.body;
      loggedUsers.push(user);
    }
    return res.jsonp(user);
  }
  return res.jsonp({ error: 'Username or password is empty' });
});

server.post('/auth/signin', (req, res) => {
  console.log('Signin', req.body);
  if (req.body.username !== '' && req.body.password !== '') {
    let user = loggedUsers.find(user => user.username === req.body.username);
    if (!user) {
      return res.jsonp({ error: 'Username or password is incorrect' });
    }
    if (user.password !== req.body.password) {
      return res.jsonp({ error: 'Username or password is incorrect' });
    }
    return res.jsonp(user);
  }
  return res.jsonp({ error: 'Username or password is empty' });
});
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});

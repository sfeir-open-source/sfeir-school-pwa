const jose = require('jose');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '143609333381-gkotcoiruj7efenonmt0qhlq3u3p103q.apps.googleusercontent.com' // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return userid;
}

class SignClassic {
  constructor(users, server) {
    this.loggedUsers = users;
    this.server = server;
    this.initRoutes();
  }

  initRoutes() {
    this.server.post('/auth/signup', this.signup.bind(this));
    this.server.post('/auth/signin', this.signin.bind(this));
    this.server.post('/auth/googleSignup', this.googleSignup.bind(this));
    this.server.post('/auth/googleSignin', this.googleSignin.bind(this));
  }

  async signup(req, res) {
    console.log('Signup', req.body);
    if (req.body.username !== '' && req.body.password !== '') {
      let user = this.loggedUsers.find(user => user.username === req.body.username);
      // If user already exists, we update the passwords
      if (user) {
        user.password = req.body.password;
      } else {
        user = req.body;
        user.federated = false;
        this.loggedUsers.push(user);
      }
      return res.jsonp(user);
    }
    return res.jsonp({ error: 'Username or password is empty' });
  }

  async signin(req, res) {
    console.log('Signin', req.body);
    if (req.body.username !== '' && req.body.password !== '') {
      let user = this.loggedUsers.find(user => user.username === req.body.username);
      if (!user) {
        return res.jsonp({ error: 'Username or password is incorrect' });
      }
      if (user.password !== req.body.password) {
        return res.jsonp({ error: 'Username or password is incorrect' });
      }
      return res.jsonp(user);
    }
    return res.jsonp({ error: 'Username or password is empty' });
  }

  async googleSignup(req, res) {
    console.log('Google Signup', req.body);
    if (req.body.token !== '') {
      const userid = await verify(req.body.token);
      const result = await jose.decodeJwt(req.body.token);
      let user = this.loggedUsers.find(user => user.username === result.email);
      if (user) {
        return res.jsonp({ error: 'User already exists' });
      }
      user = {
        email: result.email,
        username: userid,
        password: result.sub,
        federated: true
      };
      this.loggedUsers.push(user);
      return res.jsonp(user);
    }
  }

  async googleSignin(req, res) {
    console.log('Google Signin', req.body);
    if (req.body.token !== '') {
      const userid = await verify(req.body.token);
      console.log('Google Signin', userid);
      let user = this.loggedUsers.find(user => user.username === userid);
      if (!user) {
        return res.jsonp({ error: 'Username or password is incorrect' });
      }
      return res.jsonp(user);
    }
    return res.jsonp({ error: 'Username or password is empty' });
  }
}

module.exports = SignClassic;

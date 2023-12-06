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

module.exports = class Auth {
  constructor(users) {
    this.loggedUsers = users;
  }

  async signup(body) {
    if (body.username !== '' && body.password !== '') {
      let user = this.loggedUsers.find(user => user.username === body.username);
      // If user already exists, we update the passwords
      if (user) {
        user.password = body.password;
      } else {
        user = body;
        user.federated = false;
        this.loggedUsers.push(user);
      }
      return user;
    }
    throw new Error('Username or password is empty');
  }

  async signin(username, password) {
    if (username !== '' && password !== '') {
      let user = this.loggedUsers.find(user => user.username === username);
      if (!user) {
        throw new Error('Username or password is incorrect');
      }
      if (user.password !== password) {
        throw new Error('Username or password is incorrect');
      }
      return user;
    }
    throw new Error('Username or password is empty');
  }

  async googleSignup(token) {
    if (token !== '') {
      const userid = await verify(token);
      const result = await jose.decodeJwt(token);
      let user = this.loggedUsers.find(user => user.username === result.email);
      if (user) {
        throw new Error('User already exists');
      }
      user = {
        email: result.email,
        username: userid,
        password: result.sub,
        federated: true
      };
      this.loggedUsers.push(user);
      return user;
    }
  }

  async googleSignin(token) {
    if (token !== '') {
      const userid = await verify(token);
      let user = this.loggedUsers.find(user => user.username === userid);
      if (!user) {
        throw new Error('Username or password is incorrect');
      }
      return user;
    }
    throw new Error('Username or password is empty');
  }
};

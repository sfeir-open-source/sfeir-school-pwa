const SimpleWebAuthnServer = require('@simplewebauthn/server');

/*
type UserModel = {
  id: string;
  username: string;
  currentChallenge?: string;
};
type Authenticator = {
  // SQL: Encode to base64url then store as `TEXT`. Index this column
  credentialID: Uint8Array;
  // SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...
  credentialPublicKey: Uint8Array;
  // SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
  counter: number;
  // SQL: `VARCHAR(32)` or similar, longest possible value is currently 12 characters
  // Ex: 'singleDevice' | 'multiDevice'
  credentialDeviceType: CredentialDeviceType;
  // SQL: `BOOL` or whatever similar type is supported
  credentialBackedUp: boolean;
  // SQL: `VARCHAR(255)` and store string array as a CSV string
  // Ex: ['usb' | 'ble' | 'nfc' | 'internal']
  transports?: AuthenticatorTransport[];
};
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
*/

// Human-readable title for your website
const rpName = 'WebAuthN SFEIR School';
// A unique identifier for your website
const rpID = 'localhost';
// The URL at which registrations and authentications should occur
const origin = `https://${rpID}`;

class WebAuthServer {
  constructor(authInstance, server) {
    this.authInstance = authInstance;
    this.server = server;
    this.initRoutes();

    this.challengesForUser = {};
  }

  initRoutes() {
    this.server.post('/webauth/challenge', this.challenge.bind(this));
    this.server.post('/webauth/registerResponse', this.registerResponse.bind(this));
    this.server.post('/webauth/signup', this.signup.bind(this));
    this.server.post('/webauth/signin', this.signin.bind(this));
  }

  async challenge(req, res) {
    console.log('Serveur challenge', req.body);
    //TODO
    const userAuthenticators = [];

    const options = await SimpleWebAuthnServer.generateRegistrationOptions({
      rpName,
      rpID,
      userID: req.body.username,
      userName: req.body.username,
      // Don't prompt users for additional information about the authenticator
      // (Recommended for smoother UX)
      //attestationType: 'none',
      // Prevent users from re-registering existing authenticators
      excludeCredentials: userAuthenticators.map(authenticator => ({
        id: authenticator.credentialID,
        type: 'public-key',
        // Optional
        transports: authenticator.transports
      })),
      attestationType: 'none',
      /*authenticatorSelection: {
        residentKey: 'discouraged'
      }*/
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        residentKey: 'preferred',
        requireResidentKey: false,
        userVerification: 'preferred'
      }
      // See "Guiding use of authenticators via authenticatorSelection" below
      /*authenticatorSelection: {
        // Defaults
        //residentKey: 'preferred',
        requireResidentKey: false,
        userVerification: 'prefered',
        // Optional
        authenticatorAttachment: 'platform'
      }*/
    });
    //delete options.extensions;
    console.log('Serveur challenge', options);
    this.challengesForUser[req.body.username] = options.challenge;
    return res.jsonp(options);
  }

  async registerResponse(req, res) {
    console.log('Serveur registerResponse', req.body);
    const { body } = req;
    const { username } = body;
    const challenge = this.challengesForUser[username];
    let verification;
    try {
      verification = await SimpleWebAuthnServer.verifyRegistrationResponse({
        credential: body,
        expectedChallenge: challenge,
        expectedOrigin: origin,
        expectedRPID: rpID
      });
      console.log('Serveur registerResponse', verification);
      //TODO stocker le credential ?
      return res.jsonp(credential);
    } catch (e) {
      console.error(e);
      return res.status(400).send({ error: e.message });
    }
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

module.exports = WebAuthServer;

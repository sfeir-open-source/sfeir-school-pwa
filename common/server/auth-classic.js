class SignClassic {
  constructor(authInstance, server) {
    this.authInstance = authInstance;
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
    try {
      const user = await this.authInstance.signup(req.body);
      return res.jsonp(user);
    } catch (e) {
      console.error(e);
      return res.jsonp({ error: e.message });
    }
  }

  async signin(req, res) {
    console.log('Signin', req.body);
    try {
      const user = await this.authInstance.signin(req.body.username, req.body.password);
      return res.jsonp(user);
    } catch (e) {
      return res.jsonp({ error: e.message });
    }
  }

  async googleSignup(req, res) {
    console.log('Google Signup', req.body);
    try {
      const user = await this.authInstance.googleSignup(req.body.token);
      return res.jsonp(user);
    } catch (e) {
      return res.jsonp({ error: e.message });
    }
  }

  async googleSignin(req, res) {
    console.log('Google Signin', req.body);
    try {
      const user = await this.authInstance.googleSignin(req.body.token);
      return res.jsonp(user);
    } catch (e) {
      return res.jsonp({ error: e.message });
    }
  }
}

module.exports = SignClassic;

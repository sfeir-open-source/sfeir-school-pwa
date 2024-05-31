export class PeoplesService {
  constructor() {
    const SERVER = 'http://localhost:3000';
    this.SERVER_URL = SERVER;
    this.API_URL = `${SERVER}/api/people`;
    this.API_AUTH = `${SERVER}/auth`;
    this.peoples = null;
    this.peopleMap = new Map();
    this.hasRequestPending = false;
    this.networkPromise = this.initialize();
  }

  getServerUrl() {
    return this.SERVER_URL;
  }

  async initialize() {
    this.hasRequestPending = true;
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();
      this.hasRequestPending = false;
      if (this.peoples) {
        //Replace this.peoples
        Array.prototype.splice.apply(this.peoples, [0, this.peoples.length].concat(data));
      } else {
        this.peoples = data;
      }
    } catch (e) {
      console.error(e);
      this.peoples = [];
    }
  }

  onResult() {
    this.peoples.forEach(people => {
      people.name = people.firstname + ' ' + people.lastname;
      this.peopleMap.set(people.email, people);
    });
    return this.peoples;
  }

  async getPeoples() {
    await this.networkPromise;
    return this.onResult();
  }

  getPeopleById(id) {
    return this.peopleMap.get(id);
  }

  async updatePeope(people) {
    return await fetch(`${this.API_URL}/${people.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(people)
    });
  }

  getCollab(email) {
    var response = { isManager: false, collab: [] };
    angular.forEach(
      this.peopleMap,
      function(value, key) {
        if (value.manager === email) {
          response.isManager = true;
          response.collab.push(key);
        }
      },
      response
    );
    return response;
  }

  /**
   * *******************
   * AUTHENTICATION API
   * *******************
   */

  /**
   * Register a user
   * @param {*} email
   * @param {*} username
   * @param {*} password
   * @returns
   */
  register(email, username, password) {
    return fetch(`${this.API_AUTH}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password })
    });
  }

  /**
   * Signin a user
   * @param {*} username
   * @param {*} password
   * @returns
   */
  signin(username, password) {
    return fetch(`${this.API_AUTH}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  }

  /**
   * Signin a user with Google
   * @param {*} token
   * @returns
   */
  googleSignin(token) {
    return fetch(`${this.API_AUTH}/googleSignin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
  }

  /**
   * Signup a user with Google
   * @param {*} token
   * @returns
   */
  googleSignup(token) {
    return fetch(`${this.API_AUTH}/googleSignup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
  }
}

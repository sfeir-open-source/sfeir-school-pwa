import { LitElement, html } from 'lit-element';
import { PeoplesService } from '../services/People.js';

export class Login extends LitElement {
  constructor() {
    super();
    this.peoplesService = new PeoplesService();
    this.loading = true;
    this.query = '';
    this.loggedIn = false;
    this.signup = false;
    this.errorLogin = undefined;
    this.userLogged = undefined;
    this.peoples = [];
  }

  componentStyle() {
    return html`
      <style>
        :host {
          display: block;
        }
        .mdl-card {
          margin-top: 50px;
        }

        form {
          width: 100%;
        }

        button {
          margin: auto;
          margin-top: 20px;
          display: block;
        }
      </style>
    `;
  }

  toggleSignup() {
    this.signup = !this.signup;
    this.requestUpdate();
  }

  displayUser() {
    return html`
      <div class="mdl-card mdl-shadow--4dp">
        <div data-card-title>User profil</div>
        <div class="mdl-card__supporting-text">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col">
              <label class="" for="username">Username : </label>
              <span>${this.userLogged.username}</span>
            </div>
            <br />
            <div class="mdl-cell mdl-cell--12-col">
              <label class="" for="password">Password : </label>
              <span>${this.userLogged.password}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  displayUserOrLogin() {
    return html`
      ${this.loggedIn ? this.displayUser() : this.signup ? this.displaySignup() : this.displayLogin()}
    `;
  }

  displaySignup() {
    return html`
      <!-- generate login form -->
      <div class="mdl-card mdl-shadow--4dp">
        <div data-card-title>User login</div>
        <div class="signup-form">
          <p>Please enter the desire login and password</p>
          <form @submit=${this.signupUser}>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" name="username" type="text" id="username" />
              <label class="mdl-textfield__label" for="username">Username</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" name="password" type="password" id="password" />
              <label class="mdl-textfield__label" for="password">Password</label>
            </div>
            <button
              type="submit"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    `;
  }

  async signupUser(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const username = data.get('username');
    const password = data.get('password');
    console.log('Signup', username, password);
    this.peoplesService
      .register(username, password)
      .then(response => response.json())
      .then(data => {
        console.log('Signup', data);
        this.loggedIn = true;
        this.userLogged = data;
        this.requestUpdate();
      });
  }

  async signinUser(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const username = data.get('username');
    const password = data.get('password');
    this.peoplesService
      .signin(username, password)
      .then(response => response.json())
      .then(data => {
        console.log('Signin', data);
        if (data.error) {
          this.errorLogin = data.error;
          this.requestUpdate();
          return;
        }
        this.errorLogin = undefined;
        this.loggedIn = true;
        this.userLogged = data;
        this.requestUpdate();
      });
  }

  displayLogin() {
    return html`
      <!-- generate login form -->
      <div class="mdl-card mdl-shadow--4dp">
        <div data-card-title>User login</div>
        <div class="login-form">
          <p>You are currently not logged</p>
          <form @submit=${this.signinUser}>
            <input class="mdl-textfield__input" name="username" placeholder="username" type="text" id="username" />
            <input class="mdl-textfield__input" name="password" placeholder="password" type="password" id="password" />
            <button
              type="submit"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent "
            >
              Login
            </button>
          </form>
          <div class="mdl-card__actions mdl-card--border" style="display:${this.errorLogin ? 'block' : 'none'};">
            <p style="color:red;">${this.errorLogin}</p>
          </div>
        </div>
        <footer class="mdl-card__actions mdl-card--border">
          Not yet register, please <a href="#" @click=${this.toggleSignup}>Signup</a>
        </footer>
      </div>
    `;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/mdl/material.min.css" />
      <link rel="stylesheet" href="/css/app.css" />
      <link rel="stylesheet" href=/css/md-overwrite.css" /> ${this.componentStyle()}
      <div class="login-container">
        ${this.displayUserOrLogin()}
      </div>
    `;
  }
}
customElements.define('login-component', Login);

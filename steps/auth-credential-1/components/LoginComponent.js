import { LitElement, html } from 'lit';
import { PeoplesService } from '../../../../common/app/services/People.js';
import { AuthService } from '../../services/AuthService.js';

export class Login extends LitElement {
  constructor() {
    super();
    this.peoplesService = new PeoplesService();
    this.authService = new AuthService();
    this.loading = true;
    this.query = '';
    this.signup = false;
    this.errorLogin = undefined;
    this.shouldSyncGoogleButton = false;
    this.peoples = [];
    this.authService.getSingedInUser().then(user => {
      this.loggedIn = user !== undefined;
      this.userLogged = user;
      this.requestUpdate();
    });
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

        .hide {
          display: none;
        }
      </style>
    `;
  }

  /**
   * Lifecyle method trigger data are update
   * @param {*} changedProperties
   */
  updated(changedProperties) {
    if (this.shouldSyncGoogleButton) {
      this.shouldSyncGoogleButton = false;
      google.accounts.id.initialize({
        client_id: '143609333381-gkotcoiruj7efenonmt0qhlq3u3p103q.apps.googleusercontent.com',
        callback: this.handleGoogleCredentialResponse.bind(this)
      });
      google.accounts.id.renderButton(this.renderRoot.querySelector('#buttonDiv'), {
        theme: 'outline',
        size: 'medium',
        text: this.signup ? 'signup_with' : 'signin_with',
        locale: 'en'
      });
    }
  }

  /**
   * Callback of google signin or signup
   * @param {*} response
   */
  handleGoogleCredentialResponse(response) {
    if (this.signup) {
      this.peoplesService
        .googleSignup(response.credential)
        .then(response => response.json())
        .then(data => {
          console.log('Signup', data);
          if (data.error) {
            this.errorLogin = data.error;
            this.requestUpdate();
            return;
          }
          this.errorLogin = undefined;
          this.loggedIn = true;
          this.userLogged = data;
          this.authService.setSignedInUser(data);
          this.requestUpdate();
        });
    } else {
      this.peoplesService
        .googleSignin(response.credential)
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
          this.authService.setSignedInUser(data);
          this.requestUpdate();
        });
    }
  }

  toggleSignup() {
    this.signup = !this.signup;

    this.requestUpdate();
  }

  /**
   * Callback when user signin or signup with button
   * @param {*} e
   * @param {*} action
   */
  signinOrSignupUser(e, action) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const email = data.get('email');
    const username = data.get('username');
    const password = data.get('password');
    if (action === 'signup') {
      this.peoplesService
        .register(email, username, password)
        .then(response => response.json())
        .then(data => {
          console.log('Signup', data);
          this.loggedIn = true;
          this.userLogged = data;
          this.authService.setSignedInUser(data);
          this.requestUpdate();
        });
    } else {
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
          this.authService.setSignedInUser(data);
          this.requestUpdate();
        });
    }
  }
  /***
   * HTML FUNCTIONS
   */

  displayUser() {
    return html`
      <div class="mdl-card mdl-shadow--4dp">
        <div class="mdl-card__title">User profil</div>
        <div class="mdl-card__supporting-text">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--12-col">
              <label class="" for="email">Federated account : </label>
              <span>${this.userLogged.federated}</span>
            </div>
            <br />
            <div class="mdl-cell mdl-cell--12-col">
              <label class="" for="email">Email : </label>
              <span>${this.userLogged.email}</span>
            </div>
            <br />
            <div class="mdl-cell mdl-cell--12-col">
              <label class="" for="username">Username : </label>
              <span>${this.userLogged.username}</span>
            </div>
            <br />
            <div class="mdl-cell mdl-cell--12-col ${this.userLogged.federated ? 'hide' : ''}">
              <label class="" for="password">Password : </label>
              <span>${this.userLogged.password}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  displayUserOrLogin() {
    if (!this.loggedIn) {
      this.shouldSyncGoogleButton = true;
    }
    return html`
      ${this.loggedIn
        ? this.displayUser()
        : this.signup
        ? this.displayLoginOrSignup(
            'signup',
            'Register',
            'Please enter the desire login and password',
            'Signup',
            'Or signup with Google'
          )
        : this.displayLoginOrSignup(
            'signin',
            'Signin',
            'You are currently not logged, please log-in',
            'Login',
            'Or use your Google account'
          )}
    `;
  }

  displayLoginOrSignup(action, title, textHelper, buttonLabel, googleText) {
    return html`
      <!-- generate login form -->
      <div class="mdl-card mdl-shadow--4dp">
        <div class="mdl-card__title">${title}</div>
        <div class="login-form mdl-card__supporting-text">
          <p>${textHelper}</p>
          <form @submit=${e => this.signinOrSignupUser(e, action)} class="mdl-gird">
            <input
              class="mdl-cell mdl-cell--12-col mdl-textfield__input ${action === 'signup' ? '' : 'hide'}"
              name="email"
              placeholder="email"
              type="email"
              id="email"
            />
            <input
              class="mdl-cell mdl-cell--12-col mdl-textfield__input"
              name="username"
              placeholder="username"
              type="text"
              id="username"
            />
            <input
              class="mdl-cell mdl-cell--12-col mdl-textfield__input"
              name="password"
              placeholder="password"
              type="password"
              id="password"
            />
            <button
              type="submit"
              class="mdl-cell mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent "
            >
              ${buttonLabel}
            </button>
          </form>
          <div class="mdl-card__actions mdl-card--border ${this.errorLogin ? '' : 'hide'}">
            <p style="color:red;">${this.errorLogin}</p>
          </div>
          <p>${googleText}</p>
          <div id="buttonDiv"></div>
        </div>
        <footer class="mdl-card__actions mdl-card--border  ${action === 'signup' ? 'hide' : ''}">
          Not yet register, please <a href="#" @click=${this.toggleSignup}>Signup</a>
        </footer>
      </div>
    `;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/mdl/material.min.css" />
      <link rel="stylesheet" href="/css/app.css" />
      <link rel="stylesheet" href="/css/md-overwrite.css" /> ${this.componentStyle()}
      <div class="login-container">
        ${this.displayUserOrLogin()}
      </div>
    `;
  }
}
customElements.define('login-component', Login);

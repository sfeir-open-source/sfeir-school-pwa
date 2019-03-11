import { LitElement, html, css } from 'lit-element';
import { installRouter } from 'pwa-helpers/router';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

import { navigate } from '../actions/app';

export class PeopleApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      _page: { type: String },
      _peopleId: { type: String }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .page {
          display: none;
          padding-top: 175px;
        }
        .page[active] {
          display: block;
        }
      `
    ];
  }

  constructor() {
    super();
    this._page = 'home';
    this._peopleId = undefined;
    installRouter(location => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  render() {
    return html`
      <link rel="stylesheet" href="/css/material-icons.css" crossorigin="anonymous" />
      <link rel="stylesheet" href="/mdl/material.min.css" crossorigin="anonymous" />
      <link rel="stylesheet" href="/css/md-overwrite.css" crossorigin="anonymous" />
      <link rel="stylesheet" href="/css/app.css" crossorigin="anonymous" />
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
          <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">
              <a href="/home">
                <img src="./img/logo-app.png" aria-label="People" alt="People" />
              </a>
            </span>
            <!-- Add spacer, to align navigation to the right -->
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation -->
            <nav class="mdl-navigation">
              <a href="/people" class="mdl-navigation__link">
                <i class="material-icons">list</i>
              </a>
              <a href="/about" class="mdl-navigation__link">
                about
              </a>
            </nav>
          </div>
        </header>
        <main class="mdl-layout__content">
          <div class="page-content">
            <div id="root">
              <home-component class="page" ?active="${this._page === 'home'}"></home-component>
              <people-list class="page" ?active="${this._page === 'people'}" peopleid="${this._peopleId}"></people-list>
              <app-about class="page" ?active="${this._page === 'about'}"></app-about>
            </div>
          </div>
        </main>
      </div>

      <section id="shellToolbar" class="extend-toolbar">
        <button id="installButton" class="mdl-button mdl-js-button mdl-button--fab mdl-button--primary">
          <i class="material-icons">vertical_align_bottom</i>
        </button>
      </section>
    `;
  }

  stateChanged(state) {
    console.log(state);
    this._page = state.app.page;
    this._peopleId = state.app.peopleId;
  }
}

customElements.define('people-app', PeopleApp);

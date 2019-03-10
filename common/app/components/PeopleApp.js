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
      <div>
        <home-component class="page" ?active="${this._page === 'home'}"></home-component>
        <people-list class="page" ?active="${this._page === 'people'}" peopleid="${this._peopleId}"></people-list>
      </div>
    `;
  }

  stateChanged(state) {
    console.log(state);
    this._page = state.app.page;
    this._peopleId = state.app.peopleId;
  }
}

customElements.define('people-app', PeopleApp);

import { LitElement, html } from 'lit-element';
import { installRouter } from 'pwa-helpers/router';

export class PeopleApp extends LitElement {
  constructor() {
    super();
    this.page = 'home';
    this.peopleId = undefined;
    installRouter(location => {
      const pathRegex = /\/people\/([0-9]+)/;
      if (location.pathname === '/people') {
        this.page = 'people';
        this.peopleId = undefined;
      } else if (pathRegex.test(location.pathname)) {
        this.page = 'people';
        this.peopleId = pathRegex.exec(location.pathname)[1];
      } else {
        this.peopleId = undefined;
        this.page = 'home';
      }
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      ${this.page === 'home'
        ? html`
            <home-component></home-component>
          `
        : html`
            ${this.peopleId
              ? html`
                  <people-list peopleid="${this.peopleId}"></people-list>
                `
              : html`
                  <people-list></people-list>
                `}
          `}
    `;
  }
}

customElements.define('people-app', PeopleApp);

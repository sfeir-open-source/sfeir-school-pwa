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
      } else if (location.pathname === '/login') {
        this.page = 'login';
        this.peopleId = undefined;
      } else {
        this.peopleId = undefined;
        this.page = 'home';
      }
      this.requestUpdate();
    });
  }

  displayPage() {
    switch (this.page) {
      case 'home':
        return html`
          <home-component></home-component>
        `;
      case 'people':
        return html`
          ${this.peopleId
            ? html`
                <people-list peopleid="${this.peopleId}"></people-list>
              `
            : html`
                <people-list></people-list>
              `}
        `;
      case 'login':
        return html`
          <login-component></login-component>
        `;
      default:
        return html`
          <home-component></home-component>
        `;
    }
  }

  render() {
    return this.displayPage();
  }
}

customElements.define('people-app', PeopleApp);

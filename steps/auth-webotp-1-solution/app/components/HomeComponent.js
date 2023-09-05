import { LitElement, html } from 'lit-element';
import { PeoplesService } from '../services/People.js';

export class Home extends LitElement {
  constructor() {
    super();
    this.peoplesService = new PeoplesService();
    this.filteredPeople = [];
    this.loading = true;
    this.query = '';
    this.peoples = [];
  }

  async getPeoples() {
    this.peoples = await this.peoplesService.getPeoples();
    this.loading = false;
    this.requestUpdate();
  }

  get random() {
    return this.peoples[Math.floor(Math.random() * this.peoples.length)];
  }

  render() {
    if (this.peoples.length === 0) {
      this.getPeoples();
    }

    return html`
      <link rel="stylesheet" href="/mdl/material.min.css" />
      <link rel="stylesheet" href="/css/app.css" />
      <link rel="stylesheet" href="/css/md-overwrite.css" />
      <style>
        :host {
          display: block;
        }
        .home-spinner-wrapper {
          text-align: center;
          margin: 20px;
        }
      </style>

      <div>
        ${this.peoples.length < 1
          ? html`
              <div class="people-random animation-show">
                <div class="people-list-loading home-spinner-wrapper">
                  <div class="mdl-spinner mdl-js-spinner is-active"></div>
                </div>
              </div>
            `
          : html`
              <div class="people-random">
                <div data-people-card>
                  <h1>You have ${this.peoples.length} friends. Do you know ?</h1>
                  <people-card people="${JSON.stringify(this.random)}"></people-card>
                </div>
              </div>
            `}
      </div>
    `;
  }
}
customElements.define('home-component', Home);

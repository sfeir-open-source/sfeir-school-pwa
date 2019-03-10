import { LitElement, html } from 'lit-element';
import { capitalize, splitEmail } from '../../utils/helpers.js';

export class PeopleCard extends LitElement {
  static get properties() {
    return {
      people: { type: Object },
      skillOn: { type: Boolean },
      describe: { type: Boolean }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <link rel="stylesheet" href="/mdl/material.min.css" />
      <link rel="stylesheet" href="/css/app.css" />
      <link rel="stylesheet" href="/css/md-overwrite.css" />
      <style>
        :host {
          display: block;
        }

        .mdl-card .mdl-card__media .thumb {
          width: var(--card-media-width, 100%);
        }

        .mdl-card {
          width: 100%;
        }

        .mdl-card a[href^='mailto'],
        .mdl-card a[href^='tel'] {
          font-size: var(--card-font-size, 24px);
        }

        .first {
          box-shadow: 0px 1px 3px 0px #0168ab, 0px 1px 1px 0px #0168ab, 0px 2px 1px -1px #0168ab;
        }
      </style>
      <div class="mdl-card mdl-shadow--4dp">
        <div data-card-title>${this.title({ people: this.people, describe: this.describe })}</div>
        <div data-skills>${this.skillOn ? this.skills({ people: this.people }) : ''}</div>
        <div class="mdl-card__supporting-text">
          Manager : <span>${this.people.manager}</span>
          <br />
          Location : <a href="http://www.sfeir.com/contact/">${this.people.entity}</a>
          ${this.people.entity == 'Sfeir-Benelux'
            ? html`
                <a
                  target="_blank"
                  title="Locate"
                  href="http://sfeirmaplux.appspot.com/#sferian/${splitEmail(this.people.email)}"
                >
                  <md-icon md-svg-icon="img/md-map.svg"></md-icon>
                </a>
              `
            : this.people.entity == 'Sfeir-Paris'
            ? html`
                <a target="_blank" title="Locate" href="http://map.sfeir.com/#sferian/${splitEmail(this.people.email)}">
                  <md-icon md-svg-icon="img/md-map.svg"></md-icon> </a
                >̀
              `
            : ''}
        </div>
        <div data-tab-info>${this.describe ? this.tabInfo({ people: this.people }) : ''}</div>
        <div data-card-footer>${this.describe ? this.footer({ people: this.people }) : ''}</div>
      </div>
    `;
  }

  title({ people, describe }) {
    return html`
      <div class="mdl-card__title" layout="row">
        <div
          class="${describe ? 'first-info-people' : ''} mdl-card__title-text"
          layout="${describe ? 'row' : 'column'}"
          layout-align="space-around"
        >
          <span flex="75">
            <span class="md-headline">
              <a href="/people/${people.id}">${capitalize(people.firstname)} ${people.lastname.toUpperCase()}</a>
            </span>
            <span layout="column" class="layout-column" flex="100">
              <div class="people-name">${people.functionName}</div>
              <div>
                <md-icon md-people-random svg-icon="img/md-email.svg"></md-icon>
                <a href="mailto:${people.name}<${people.email}>">${people.email}</a>
              </div>
              ${people.contactInfoPro.mobilePhone
                ? html`
                    <div>
                      <md-icon md-svg-icon="img/md-phone.svg"></md-icon>
                      <a href="tel:${people.contactInfoPro.mobilePhone}">${people.contactInfoPro.mobilePhone}</a>
                    </div>
                  `
                : people.contactInfoPro.fixedPhone
                ? html`
                    <div>
                      <md-icon md-svg-icon="img/md-phone.svg"></md-icon>
                      <a href="tel:${people.contactInfoPro.fixedPhone}">${people.contactInfoPro.fixedPhone}</a>
                    </div>
                  `
                : ''}
            </span>
          </span>
          ${describe
            ? html`
                <div flex class="img-circle">
                  <img class="thumb" err-src="/img/profile.svg" src="/${people.photo}" alt="image profile" />
                </div>
              `
            : ''}
        </div>
        ${!describe
          ? html`
              <div class="mdl-card__media" flex="30">
                <div class="card-media">
                  <a href="#/people/${people.email}">
                    <img class="thumb" err-src="/img/profile.svg" src="/${people.photo}" />
                  </a>
                </div>
                <div></div>
              </div>
            `
          : ''}
      </div>
    `;
  }

  skills({ people }) {
    return html`
      <div class="md-padding" id="skills">
        <h2>Skills</h2>
        <div layout="row" layout-wrap layout-align="space-around center">
          ${people.skills
            .map(
              skill => html`
                <md-button
                  aria-label="skill"
                  class="${skill.toLowerCase() == skillOn.toLowerCase() ? 'skillActive' : ''}"
                  class="md-raised"
                  href="/people/skill/${skill}"
                >
                  ${skill}
                </md-button>
              `
            )
            .join()}
        </div>
      </div>
    `;
  }

  tabInfo({ people, manager }) {
    return html`
      <md-tabs md-dynamic-height md-border-bottom class="tab-information">
        <md-tab label="Organisation">
          <md-content class="md-padding">
            <ul>
              <li>${people.functionName}</li>
              <li><br />${people.functionDescription || '-'}</li>
            </ul>
            <ul>
              <li>Current customer</li>
              <li>${people.currentClient || '—'}</li>
            </ul>
            <h3 hidden="${!people.skills[0]}">Skills</h3>
            <div layout="row" layout-wrap layout-align="space-around center">
              ${people.skills
                .map(
                  skill => html`
                    <md-button aria-label="skill" hidden="${!skill}" href="/people/skill/${skill}">${skill}</md-button>
                  `
                )
                .join()}
            </div>
          </md-content>
        </md-tab>
        <md-tab disabled="${!manager.isManager}" label="Collaborateurs">
          <md-content id="skills" class="md-padding">
            <div layout="row" layout-wrap layout-align="space-around center">
              ${manager.collab
                .map(
                  collab => html`
                    <p>
                      <a href="/people/${collab}">${collab}</a>
                    </p>
                  `
                )
                .join()}
            </div>
          </md-content>
        </md-tab>
      </md-tabs>
    `;
  }

  footer({ people }) {
    return html`
      <md-card-footer class="information-footer" layout="row" layout-wrap layout-align="center center">
        <md-card-icon-actions>
          <md-button
            target="_blank"
            href="https://twitter.com/${people.twitter}"
            class="md-icon-button"
            aria-label="twitter"
          >
            <md-tooltip md-direction="top">
              Twitter
            </md-tooltip>
            <md-icon md-svg-icon="img/md-twitter.svg"></md-icon>
          </md-button>
          <md-button
            target="_blank"
            href="https://sfeirgroup.slack.com/messages/@${people.slack}/"
            class="md-icon-button"
            aria-label="slack"
          >
            <md-tooltip md-direction="top">
              Slack
            </md-tooltip>
            <md-icon md-svg-icon="img/md-slack.svg"></md-icon>
          </md-button>
          <md-button
            target="_blank"
            href="https://github.com/${people.github}"
            class="md-icon-button"
            aria-label="github"
          >
            <md-tooltip md-direction="top">
              GitHub
            </md-tooltip>
            <md-icon md-svg-icon="img/md-github.svg"></md-icon>
          </md-button>
          <md-button target="_blank" href="${people.linkedIn}" class="md-icon-button" aria-label="linkedin">
            <md-tooltip md-direction="top">
              Linkedin
            </md-tooltip>
            <md-icon md-svg-icon="img/md-linkedin.svg"></md-icon>
          </md-button>
        </md-card-icon-actions>
      </md-card-footer>
    `;
  }
}
customElements.define('people-card', PeopleCard);

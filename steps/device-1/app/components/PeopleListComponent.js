import { LitElement, html } from 'lit-element';
import { PeoplesService } from '../../../../common/app/sevices/People.js';

export class PeopleList extends LitElement {
  static get properties() {
    return {
      peopleid: String
    };
  }

  constructor() {
    super();
    this.peoplesService = new PeoplesService();
    this.peoples = [];
    this.peopleid = undefined;
    this.filteredPeople = [];
    this.loading = true;
    this.query = '';
    this.geolocQuerying = false;
  }

  async getPeoples() {
    this.loading = true;
    this.peoples = await this.peoplesService.getPeoples();
    this.filterPeopleById(this.peopleid);
    this.loading = false;
    this.requestUpdate();
  }

  filterPeopleById(id) {
    const people = this.peoples.find(people => id === '' + people.id);
    this.filteredPeople = people ? [people] : this.peoples;
  }

  filterPeopleByName(str) {
    const query = str.toLowerCase();
    this.filteredPeople = this.peoples.filter(people => {
      const name = `${people.firstname} ${people.lastname}`.toLowerCase();
      return name.includes(query);
    });
  }

  filterAccordingGeoloc(e) {
    if (!this.geolocQuerying) {
      // YOUR CODE HERE
    } else {
      this.getNearestAgency(null);
      this.requestUpdate();
    }
    this.geolocQuerying = !this.geolocQuerying;
    this.requestUpdate();
  }

  _deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  _getDistanceFromLatLongInKm(coord1, coord2) {
    const RADIUS_EARTH = 6371; // Radius of the earth in km
    const dLat = this._deg2rad(coord2.lat - coord1.lat);
    const dLong = this._deg2rad(coord2.long - coord1.long);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this._deg2rad(coord1.lat)) *
        Math.cos(this._deg2rad(coord2.lat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = RADIUS_EARTH * c; // Distance in km
    return d;
  }

  getNearestAgency(coord) {
    if (coord) {
      const tempMapDistance = {};
      const minDistance = Math.min(
        ...this.peoples.map(people => {
          const distance = this._getDistanceFromLatLongInKm(people.workCoords, coord);
          tempMapDistance[people.id] = distance;
          return distance;
        })
      );
      this.filteredPeople = this.peoples.filter(people => tempMapDistance[people.id] === minDistance);
    } else {
      this.filteredPeople = this.peoples;
    }
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
      </style>
      <div>
        ${this.filteredPeople.length < 1
          ? html`
              <div class="people-list-all md-padding" layout="row" layout-wrap layout-align="center center">
                <div>
                  <div>
                    <h1>No sfeirien found</h1>
                  </div>
                </div>
              </div>
            `
          : html`
              <div class="people-list-all md-padding" layout="row" layout-wrap layout-align="center center">
                ${!this.peopleid
                  ? html`
                      <form>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                          <label class="mdl-button mdl-js-button mdl-button--icon" for="pleople-search">
                            <i class="material-icons">search</i>
                          </label>
                          <div class="mdl-textfield__expandable-holder">
                            <input class="mdl-textfield__input" type="text" id="pleople-search" />
                            <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
                          </div>
                        </div>
                        <label
                          id="location-button"
                          class="mdl-button mdl-js-button mdl-button--icon"
                          @click="${this.filterAccordingGeoloc}"
                        >
                          ${this.geolocQuerying
                            ? html`
                                <i class="material-icons">location_on</i>
                              `
                            : html`
                                <i class="material-icons">location_off</i>
                              `}
                        </label>
                      </form>
                    `
                  : html``}
                <div class="people-card-list" data-people-cards-wrapper>
                  ${this.filteredPeople.map(
                    people => html`
                      <people-card class="people-card-list-mode" people="${JSON.stringify(people)}"></people-card>
                    `
                  )}
                </div>
              </div>
            `}
      </div>
    `;
  }
}
customElements.define('people-list', PeopleList);

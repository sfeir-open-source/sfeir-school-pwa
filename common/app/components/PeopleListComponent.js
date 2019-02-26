import {
    LitElement,
    html
} from 'lit-element';
import {
    PeoplesService
} from '../sevices/People.js';

export class PeopleList extends LitElement {

    static get properties() {
        return {
            peopleid: String
        }
    }

    constructor() {
        super();
        this.peoplesService = new PeoplesService();
        this.peoples = [];
        this.peopleid = undefined;
        this.filteredPeople = [];
        this.loading = true;
        this.query = "";
    }

    async getPeoples() {
        this.loading = true;
        this.peoples = await this.peoplesService.getPeoples();
        this.filterPeopleById(this.peopleid);
        this.loading = false;
        this.requestUpdate();
    }

    filterPeopleById(id) {
        const people = this.peoples.find(people => id === ("" + people.id));
        this.filteredPeople = people ? [people] : this.peoples;
    }

    filterPeopleByName(str) {
        const query = str.toLowerCase();
        this.filteredPeople = this.peoples.filter(people => {
            const name = `${people.firstname} ${people.lastname}`.toLowerCase();
            return name.includes(query);
        });
    }

    render() {
        if (this.peoples.length === 0) {
            this.getPeoples();
        }
        return html `
            <link rel="stylesheet" href="/mdl/material.min.css">
            <link rel="stylesheet" href="/css/app.css">
            <link rel="stylesheet" href="/css/md-overwrite.css">
            <style>
                :host {
                    display: block;
                }
            </style>
        <div>
            ${this.filteredPeople.length < 1
            ?
            html`
            <div class="people-list-all md-padding" layout="row" layout-wrap layout-align="center center">
                <div>
                    <div>
                        <h1>No sfeirien found</h1>
                    </div>
                </div>
            </div>
            `
            :
            html`
            <div class="people-list-all md-padding" layout="row" layout-wrap layout-align="center center">
                ${!this.peopleid
                ?
                    html`
                    <form>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                        <label class="mdl-button mdl-js-button mdl-button--icon" for="pleople-search">
                        <i class="material-icons">search</i>
                        </label>
                        <div class="mdl-textfield__expandable-holder">
                        <input class="mdl-textfield__input" type="text" id="pleople-search">
                        <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
                        </div>
                    </div>
                    </form>
                    `
                : html``}
                <div class="people-card-list" data-people-cards-wrapper>
                ${this.filteredPeople.map(people => html`
                    <people-card
                        class="people-card-list-mode"
                        people='${JSON.stringify(people)}'
                        ></people-card>
                    `)}
                </div>
            </div>
            `
            }
        </div>
        `;
    }

}
customElements.define('people-list', PeopleList);
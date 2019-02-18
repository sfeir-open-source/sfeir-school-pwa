import { RoutedComponent } from "../../../../common/utils/component/RoutedComponent";
import { PlainComponent } from "../../../../common/utils/component/PlainComponent";
import { PeopleCardComponent } from "../../../../common/app/components/PeopleCard";

export class PeopleComponent extends RoutedComponent {
  constructor(parent, { peoples }, appRouter) {
    super(parent);
    this.peoplesService = peoples;
    this.filteredPeople = [];
    this.loading = true;
    this.query = "";
    this.geolocQuerying = false;
    this.appRouter = appRouter;
  }

  async getPeoples() {
    this.loading = true;
    this.peoples = await this.peoplesService.getPeoples();
    this.loading = false;
  }

  async init() {
    const container = document.createElement("div");
    this.usernamePrompt = new PlainComponent(container);
    this.content = new PlainComponent(container);
    this.container = this.parent.appendChild(container);
    await this.getPeoples();
  }

  filterPeopleById(id) {
    const people = this.peoples.find(people => id === ("" + people.id));
    this.filteredPeople = people ? [ people ] : [];
  }

  filterPeopleByName(str) {
    const query = str.toLowerCase();
    this.filteredPeople = this.peoples.filter(people => {
      const name = `${people.firstname} ${people.lastname}`.toLowerCase();
      return name.includes(query);
    });
  }

  _deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  _getDistanceFromLatLongInKm(coord1, coord2) {
    const RADIUS_EARTH = 6371; // Radius of the earth in km
    const dLat = this._deg2rad(coord2.lat - coord1.lat);
    const dLong = this._deg2rad(coord2.long - coord1.long);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this._deg2rad(coord1.lat)) * Math.cos(this._deg2rad(coord2.lat)) *
      Math.sin(dLong/2) * Math.sin(dLong/2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = RADIUS_EARTH * c; // Distance in km
    return d;
  }

  getNearestAgency(coord) {
    if (coord) {
      const tempMapDistance = {};
      const minDistance = Math.min(...this.peoples.map(people => {
        const distance = this._getDistanceFromLatLongInKm(people.workCoords, coord)
        tempMapDistance[people.id] = distance;
        return distance;
      }))
      this.filteredPeople = this.peoples.filter(people => tempMapDistance[people.id] === minDistance);
    } else {
      this.filteredPeople = this.peoples;
    }
  }

  // TODO: split between a ListComponent and a ShowPeopleComponent for better filtering management
  async render([peopleId] = [], filter = true) {
    if (!this.container) {
      await this.init();
    }

    if (filter) {
      if (peopleId) {
        this.filterPeopleById(peopleId);
      }
    } else {
      this.filteredPeople = this.peoples;
    }

    // TODO: hidden optimization
    if (this.filteredPeople.length < 1) {
      this.content.render(`
        <div class="people-list-all md-padding" layout="row" layout-wrap layout-align="center center">
            <div>
                <div>
                    <h1>No sfeirien found</h1>
                </div>
            </div>
        </div>
      `);
    } else {
      this.content.render(`
        <div class="people-list-all md-padding" layout="row" layout-wrap layout-align="center center">`
            +(!peopleId
            ? `<form>
              <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label class="mdl-button mdl-js-button mdl-button--icon" for="pleople-search">
                  <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                  <input class="mdl-textfield__input" type="text" id="pleople-search">
                  <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
                </div>
              </div>
              <label id="location-button" class="mdl-button mdl-js-button mdl-button--icon">
                <i class="material-icons">location_off</i>
              </label>
              </form>
            ` : '')+
            `<div class="people-card-list" data-people-cards-wrapper>
            </div>
        </div>
      `);

      const peopleCardsWrapper = this.content.container.querySelector(
        "[data-people-cards-wrapper]"
      );

      const renderList = () => {
        peopleCardsWrapper.innerHTML = '';
        // TODO: optimization for re-rendering
        this.peopleCards = this.filteredPeople.map(people => ({
          component: new PeopleCardComponent(peopleCardsWrapper, this.appRouter),
          people
        }));
        this.peopleCards.forEach(({ component, people }) => {
          component.render({ people, describe: false });
        });
      };

      renderList();

      if (!peopleId) {
        // TODO: manager 'enter' key
        this.content.container.querySelector("#pleople-search").addEventListener(
          "keyup",
          e => {
            const query = e.srcElement.value;
            if (query.length > 2) {
              this.filterPeopleByName(query);
            } else {
              this.filteredPeople = this.peoples;
            }
            renderList();
          },
          true
        );

        this.content.container.querySelector('#location-button').addEventListener(
          'click',
          e => {
            if (!this.geolocQuerying){
              // YOUR CODE HERE
            } else {
              this.getNearestAgency(null);
              renderList();
            }
            this.geolocQuerying = !this.geolocQuerying;
            this.content.container.querySelector('#location-button i').innerHTML = this.geolocQuerying ? 'location_on' : 'location_off';
          }
        )
      }

    }
  }
}

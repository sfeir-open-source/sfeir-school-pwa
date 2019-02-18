import { RoutedComponent } from "../../utils/component/RoutedComponent";
import { PlainComponent } from "../../utils/component/PlainComponent";
import { PeopleCardComponent } from "./PeopleCard";

export class PeopleComponent extends RoutedComponent {
  constructor(parent, { peoples }, appRouter) {
    super(parent);
    this.peoplesService = peoples;
    this.filteredPeople = [];
    this.loading = true;
    this.query = "";
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
            </form>` : '')+
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
      }

      componentHandler.upgradeDom();
    }
  }
}

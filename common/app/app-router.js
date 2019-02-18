import { Router } from '../utils/Router';
import { HomeComponent } from "./components/Home";
import { services } from './services';
import { PeopleComponent } from './components/People';

const root = document.querySelector("#root");
const routes = new Map([]);
const appRouterInstance = new Router(root, routes, 'home');
const home = new HomeComponent(root, { peoples: services.get('peoples')}, appRouterInstance);
const people = new PeopleComponent(root, { peoples: services.get('peoples')}, appRouterInstance);

routes.set('home', { component: home })
routes.set('people', { component: people, render: (params) => params.length > 0 ? people.render(params) : people.render([], false) })

export const appRouter = appRouterInstance;


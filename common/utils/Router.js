export class Router {

  constructor(container, routes, defaultRoute) {
    this.container = container;
    this.routes = routes;
    this.defaultRoute = defaultRoute;

    window.onpopstate = e => {
      this.resolve();
    };
  }

  resolve() {
    const routeParams = window.location.pathname.split('/').slice(1);
    const routePath = routeParams.shift();
    if (this.routes.has(routePath)) {
      this.routes.forEach(({ component }) => {
        component.destroy();
      });
      const { component, render } = this.routes.get(routePath);
      if (render) {
        render(routeParams)
      } else {
        component.render(routeParams)
      }
    } else if (this.defaultRoute) {
      this.navigate(this.defaultRoute);
    } else {
      throw new Error(`There isn't any route to follow!`);
    }
  }

  navigate(route, data = {}) {
    history.pushState(data, '', route);
    this.resolve();
  }
}

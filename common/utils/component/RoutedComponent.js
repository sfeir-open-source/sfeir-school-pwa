import { Component } from "./Component";

export class RoutedComponent extends Component {
  destroy() {
    if (this.container) {
      const newContainer = document.createElement('div');
      this.container.replaceWith(newContainer);
      this.container = null;
    }
  }
}

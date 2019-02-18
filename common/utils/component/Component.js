
export class Component {
  constructor(parent) {
    this.parent = parent;
    this.components = new Map();
  }

  renderContainer(newContainer) {
    if(this.container) {
      this.container.replaceWith(newContainer);
    } else {
      this.parent.appendChild(newContainer);
    }
    this.container = newContainer;
  }
}

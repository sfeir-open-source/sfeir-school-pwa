import { Component } from './Component';
import { compileTemplate } from './compileTemplate';
export class PlainComponent extends Component {
  constructor(parent) {
    super(parent);
  }

  render(template) {
    const container = compileTemplate(template);
    this.renderContainer(container);
  }
}

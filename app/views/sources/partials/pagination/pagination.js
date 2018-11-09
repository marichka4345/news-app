import { renderTemplate } from '../../../../utils/templates';

const template = require('./pagination.handlebars');

export class Pagination {
  template = template();

  render(rootElement) {
    renderTemplate(this.template, rootElement, 'pagination');
  }
}
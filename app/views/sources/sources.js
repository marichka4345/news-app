import { FilterList, Pagination } from './partials';

export class Sources {
  children = [ FilterList, Pagination ];

  render (rootElement) {
    this.children.forEach(component => new component().render(rootElement));
  }
}
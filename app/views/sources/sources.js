import { FilterList, NewsSourceList, Pagination } from './partials';

export class Sources {
  children = [ FilterList, NewsSourceList, Pagination ];

  render (rootElement) {
    this.children.forEach(component => {
      new component().render(rootElement);
    });
  }
}
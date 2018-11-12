import { FilteredSourceList } from './partials/filtered-source-list/filtered-source-list';
import { SourceNews } from './partials/source-news/source-news';

export class News {
  children = [ FilteredSourceList, SourceNews ];

  render = rootElement => {
    this.children.forEach(component => new component().render(rootElement));
  }
}
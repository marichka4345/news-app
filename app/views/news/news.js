import { FilteredSourceList } from './partials/filtered-source-list/filtered-source-list';
import { SourceNews } from './partials/source-news/source-news';
import { SortingBar } from './partials/sorting-bar/sorting-bar';

export class News {
  children = [ FilteredSourceList, SortingBar, SourceNews ];

  render = rootElement => {
    this.children.forEach(component => new component().render(rootElement));
  }
}
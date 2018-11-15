import { FilteredSourceList } from './partials/filtered-source-list/filtered-source-list';
import { SortingBar } from './partials/sorting-bar/sorting-bar';

export class News {
  children = [ FilteredSourceList, SortingBar ];

  render = rootElement => {
    this.children.forEach(component => {
      new component().render(rootElement)
    });
  }
}
import { sources } from './sources';
import { NewsSourceList } from '../views/sources/partials';

class Filters {
  constructor(){
    if (!Filters.instance){
      this.data = {};
      this.sources = sources;
      Filters.instance = this;
    }

    return Filters.instance;
  }

  addFilter = ({ id, filterValue }) => {
    if (!this.data[id]) {
      this.data[id] = [];
    }

    this.data[id].push(filterValue);
    this.sources.getFilteredData(this.data);

    document.querySelector('.news-source-list').remove();
    new NewsSourceList().render(document.body);
  };

  removeFilter = ({ id, filterValue }) => {
    this.data[id] = this.data[id].filter(item => item !== filterValue);
    this.sources.getFilteredData(this.data);

    document.querySelector('.news-source-list').remove();
    new NewsSourceList().render(document.body, );
  };
}

const filters = new Filters();

export { filters };
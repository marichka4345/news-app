import { sources } from './sources';
import { pagination } from './pagination';

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

    pagination.updatePageSourcesAfterFilter(1);
  };

  removeFilter = ({ id, filterValue }) => {
    this.data[id] = this.data[id].filter(item => item !== filterValue);
    this.sources.getFilteredData(this.data);

    pagination.updatePageSourcesAfterFilter(1);
  };
}

const filters = new Filters();

export { filters };
import { sources } from './sources';
import { pagination } from './pagination';

class FiltersService {
  constructor(){
    if (!FiltersService.instance){
      this.data = {};
      FiltersService.instance = this;
    }

    return FiltersService.instance;
  }

  addFilter = ({ id, filterValue }) => {
    if (!this.data[id]) {
      this.data[id] = [];
    }

    this.data[id].push(filterValue);

    sources.getFilteredData(this.data).then(() => {
      pagination.updatePageSourcesAfterFilter();
    });
  };

  removeFilter = ({ id, filterValue }) => {
    this.data[id] = this.data[id].filter(item => item !== filterValue);

    sources.getFilteredData(this.data).then(() => {
      pagination.updatePageSourcesAfterFilter();
    });
  };
}

const filters = new FiltersService();

export { filters };
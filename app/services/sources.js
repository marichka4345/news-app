import { getLocalSources, getSourcesLastDate, fetchSources } from '../utils/fetchData';

class Sources {
  constructor(){
    this.getInstance();
  }

  getInstance = async () => {
    if (!Sources.instance){
      this.data = getLocalSources();
      this.filteredData = this.data;
      Sources.instance = this;
    }

    if ((new Date() - getSourcesLastDate()) / 60 >= 20 ) {
      this.data = await fetchSources();
      this.filteredData = this.data;
      Sources.instance = this;
    }

    return Sources.instance;
  };

  getFilteredData = filters => {
    let filteredData = this.data;
    const filterIds = Object.keys(filters).filter(id => filters[id].length);

    filterIds.forEach(key => {
      filteredData = filteredData.filter(
        source => filters[key].includes(source[key])
      );
    });

    this.filteredData = filteredData;
  };
}

const sources = new Sources();

export { sources };
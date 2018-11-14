import { fetchSourcesUrl } from '../constants';

class SourcesService {
  constructor(){
    if (!SourcesService.instance){
      SourcesService.instance = this;
    }

    return SourcesService.instance;
  }

  getSources = () => {
    const localSources = this.getLocalSources();
    const areSourcesUpdated =
      (new Date().getTime() - this.getSourcesLastDate()) / 60000 < 20;

    return localSources.length && areSourcesUpdated
      ? Promise.resolve(localSources)
      : this.fetchSources();
  };

  getFilteredSources = () => {
    const { filteredSources } = this;
    return filteredSources
      ? Promise.resolve(filteredSources)
      : this.getSources();
  };

  fetchSources = () => {
    return fetch(fetchSourcesUrl)
      .then(response => response.json())
      .then(({ sources }) => {
        localStorage.setItem('sources', JSON.stringify(sources));
        localStorage.setItem('sources_date', new Date().toString());
        return sources;
      });
  };

  getLocalSources = () => {
    const localSources = localStorage.getItem('sources');
    return localSources
      ? JSON.parse(localStorage.getItem('sources'))
      : [];
  };

  getSourcesLastDate = () => {
    return new Date(localStorage.getItem('sources_date')).getTime();
  };

  getFilteredData = async (filters) => {
    let filteredData = await this.getSources();
    const filterIds = Object.keys(filters).filter(id => filters[id].length);

    filterIds.forEach(key => {
      filteredData = filteredData.filter(
        source => filters[key].includes(source[key])
      );
    });

    this.filteredSources = filteredData;
    return filteredData;
  };
}

const sources = new SourcesService();

export { sources };
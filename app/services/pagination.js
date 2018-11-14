import { sources } from './sources';
import { NewsSourceList, Pagination } from '../views/sources/partials';
import { rerenderTemplate } from '../utils';
import { SOURCES_PER_PAGE } from '../constants';

class PaginationService {
  constructor(){
    if (!PaginationService.instance){
      this.pageNumber = 1;
      PaginationService.instance = this;
    }

    return PaginationService.instance;
  }

  getPageSources = async(startPage) => {
    const sourcesData = await sources.getFilteredSources();

    const pageNumber = startPage || this.pageNumber;
    const startPosition = (pageNumber - 1) * SOURCES_PER_PAGE;

    return sourcesData.slice(startPosition, startPosition + SOURCES_PER_PAGE);

  };

  setCurrentPage = pageNumber => {
    this.pageNumber = pageNumber;
    this.updatePageSources();
  };

  next = () => {
    this.setCurrentPage(this.pageNumber + 1);
  };

  prev = () => {
    this.setCurrentPage(this.pageNumber - 1);
  };

  updatePageSources = () => {
    rerenderTemplate(NewsSourceList, document.body, 'news-source-list');
  };

  updatePageSourcesAfterFilter = () => {
    this.setCurrentPage(1);
    rerenderTemplate(Pagination, document.body, 'pagination');
  };
}

const pagination = new PaginationService();

export { pagination };
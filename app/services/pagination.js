import { sources } from './sources';
import { NewsSourceList, Pagination } from '../views/sources/partials';
import { rerenderTemplate } from '../utils/templates';
import { SOURCES_PER_PAGE } from '../constants/sources-pagination';

class PaginationService {
  constructor(){
    if (!PaginationService.instance){
      this.pageNumber = 1;
      this.pageSources = sources.filteredData ? sources.filteredData.slice(0, SOURCES_PER_PAGE) : [];
      PaginationService.instance = this;
    }

    return PaginationService.instance;
  }

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

  updatePageSources = startPage => {
    const pageNumber = startPage || this.pageNumber;
    const startPosition = (pageNumber - 1) * SOURCES_PER_PAGE;
    this.pageSources = sources.filteredData.slice(startPosition, startPosition + SOURCES_PER_PAGE);

    rerenderTemplate(NewsSourceList, document.body, 'news-source-list');
  };

  updatePageSourcesAfterFilter = startPage => {
    this.updatePageSources(startPage);

    rerenderTemplate(Pagination, document.body, 'pagination');
  };
}

const pagination = new PaginationService();

export { pagination };
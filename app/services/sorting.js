import { rerenderTemplate } from '../utils';
import { SourceNews } from '../views/news/partials/source-news/source-news';

class SortingService {
  constructor(){
    if (!SortingService.instance){
      SortingService.instance = this;
    }

    return SortingService.instance;
  }

  setActive = item => {
    this.activeItem = item;

    rerenderTemplate(SourceNews, document.body, 'source-news');
  };

}

const sorting = new SortingService();

export { sorting };
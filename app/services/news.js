import { PAGE_SIZE, SORTING_INFO } from '../constants';
import { sorting } from './sorting';
import { errors } from './errors';

class NewsService {
  constructor() {
    if (!NewsService.instance){
      NewsService.instance = this;
    }

    return NewsService.instance;
  }

  getNews = (page = 1) => {
    const { source } = this;
    const localNews = this.getLocalNews(source, page);

    return localNews.length && this.areNewsUpdated
      ? Promise.resolve(localNews)
      : this.fetchSourceNews(source, page);
  };

  fetchSourceNews = (source, page = 1) => {
    if (!source) {
      return;
    }

    const { activeItem } = sorting;
    const fetchUrl = SORTING_INFO[activeItem](source, page);

    return fetch(fetchUrl)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'error') {
          throw new Error(response.message)
        }

        const { articles } = response;
        const localNews = JSON.parse(localStorage.getItem(`articles-${source}`)) || [];

        const newsData = localNews.length
          ? [ ...localNews, ...articles ]
          : articles;

        const news = JSON.stringify(newsData);
        localStorage.setItem(`articles-${source}-by-${activeItem}`, news);
        localStorage.setItem(`articles-${source}-by-${activeItem}_date`, new Date().toString());
        return articles;
      })
      .catch(error => {
        errors.showError(error);
        return [];
      });
  };

  getLocalNews = (source, page = 1) => {
    const { activeItem } = sorting;
    const localNews = localStorage.getItem(`articles-${source}-by-${activeItem}`);

    if (!localNews) {
      return [];
    }

    const parsedNews = JSON.parse(localNews);

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    if (startIndex > parsedNews.length - 1) {
      return [];
    }
    return parsedNews.slice(startIndex, endIndex);
  };

  getNewsLastDate = source => {
    const { activeItem } = sorting;
    return new Date(localStorage.getItem(`articles-${source}-by-${activeItem}_date`)).getTime();
  };

  areNewsUpdated = source => {
    const lastNewsFetchDate = this.getNewsLastDate(source);

    return lastNewsFetchDate &&
      (new Date().getTime() - this.getNewsLastDate(source)) / 60000 < 20;
  };

  setSource = source => {
    if (this.source !== source) {
      this.source = source;
    }
  };
}

const news = new NewsService();

export { news };
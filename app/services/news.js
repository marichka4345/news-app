import { PAGE_SIZE } from '../constants';

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

    return fetch(`https://newsapi.org/v2/everything?sources=${source}&page=${page}&apiKey=abb27eb2154e472a8114c71c096b8a70`)
      .then(response => response.json())
      .then(({ articles }) => {
        const localNews = JSON.parse(localStorage.getItem(`articles-${source}`)) || [];

        const newsData = localNews.length
          ? [ ...localNews, ...articles ]
          : articles;

        const news = JSON.stringify(newsData);
        localStorage.setItem(`articles-${source}`, news);
        localStorage.setItem(`articles-${source}_date`, new Date().toString());
        return articles;
      });
  };

  getLocalNews = (source, page = 1) => {
    const localNews = localStorage.getItem(`articles-${source}`);

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
    return new Date(localStorage.getItem(`articles-${source}_date`)).getTime();
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
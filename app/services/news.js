import {
  fetchSourceNews,
  getLocalNews,
  getNewsLastDate
} from '../utils/fetchData';

const areNewsUpdated = source => {
  const lastNewsFetchDate = getNewsLastDate(source);

  return lastNewsFetchDate &&
    (new Date().getTime() - getNewsLastDate(source)) / 60000 >= 20;
};

class News {
  constructor() {
    if (!News.instance){
      this.data = [];
      News.instance = this;
    }

    return News.instance;
  }

  setSource = async (source) => {
    if (this.source !== source) {
      this.source = source;

      const isInLocalStorage = !!getLocalNews(source).length;

      if (!isInLocalStorage || areNewsUpdated(source)) {
        this.data = await fetchSourceNews(this.source);
      } else {
        this.data = getLocalNews(source);
      }
    }
  };

  navigateToSourceNews = source => {
    this.setSource(source)
      .then(() => { window.router.navigateTo(`news-source/${source}`); });
  };
}

const news = new News();

export { news };
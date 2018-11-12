import { renderTemplate } from '../../../../utils/templates';
import { news } from '../../../../services/news';
import { fetchSourceNews, getLocalNews } from '../../../../utils/fetchData';

const template = require('./source-news.handlebars');

import './source-news.scss';

export class SourceNews {
  prevY = 0;
  page = 1;

  getTemplate = () => {
    const newsData = news.data;
    return newsData.length && news.source
      ? template({ news: newsData })
      : fetchSourceNews(news.source).then(news => template({ news }));
  };

  setup = () => {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver,
      options
    );

    const loader = document.querySelector('.source-news__loader');
    this.observer.observe(loader);
  };

  handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (this.prevY > y) {
      this.page = this.page + 1;
      this.getNews(this.page, observer);
    }

    this.prevY = y;
  };

  getNews = async (page, observer) => {
    const loader = document.querySelector('.source-news__loader');
    loader.style.visibility = 'visible';
    const localNews = getLocalNews(news.source, page);

    let newsData = localNews;

    if (!localNews.length) {
      await fetchSourceNews(news.source, page);
      newsData = getLocalNews(news.source, page);
    }

    loader.style.visibility = 'hidden';
    observer.unobserve(loader);
    const newsElement = document.querySelector('.source-news');
    newsElement.removeChild(loader);

    document.querySelector('.source-news').insertAdjacentHTML( 'beforeend', template({ news: newsData }));
    const newLoader = document.querySelector('.source-news__loader');
    observer.observe(newLoader);
  };

  render = async (rootElement) => {
    const template = await this.getTemplate();
    renderTemplate(template, rootElement, 'source-news');

    this.setup();
  }
}
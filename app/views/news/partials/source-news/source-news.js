import { renderTemplate } from '../../../../utils';
import { news } from '../../../../services/news';

const template = require('./source-news.handlebars');
const newsItemTemplate = require('./partials/news-page.handlebars');

import './source-news.scss';

const loaderObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
};

export class SourceNews {
  page = 1;

  getTemplate = async () => {
    const newsData = await news.getNews(1);
    return template({ news: JSON.stringify(newsData) });
  };

  setup = () => {
    this.observer = new IntersectionObserver(
      this.handleObserver,
      loaderObserverOptions
    );

    const loader = document.querySelector('.source-news__loader');
    this.observer.observe(loader);
  };

  handleObserver = (entities) => {
    const entity = entities[0];

    if  (!entity.isIntersecting) {
      return;
    }

    this.page = this.page + 1;
    this.getNews(this.page);
  };

  getNews = async (page) => {
    const loader = document.querySelector('.source-news__loader');

    loader.style.visibility = 'visible';
    const newsData = await news.getNews(page);
    loader.style.visibility = 'hidden';

    document.querySelector('.source-news__list').insertAdjacentHTML(
      'beforeEnd',
      newsItemTemplate({ news: newsData })
    );
  };

  render = rootElement => {
    this.getTemplate().then(template => {
      renderTemplate(template, rootElement, 'source-news');
      this.setup();
    });
  }
}
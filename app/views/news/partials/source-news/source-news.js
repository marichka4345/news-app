import { getDataAttribute, renderTemplate } from '../../../../utils';
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
    console.log('render');
    const newsData = await news.getNews(1);
    return template({ news: JSON.stringify(newsData) });
  };

  setup = () => {
    this.displayImagesOnLoad();

    this.observer = new IntersectionObserver(
      this.handleObserver,
      loaderObserverOptions
    );

    const loader = document.querySelector('.source-news__loader');
    this.observer.observe(loader);
  };

  displayImagesOnLoad = () => {
    const imageWrapperClassName = 'source-news__image-wrapper';
    const imageClassName = 'source-news__image';

    const imageWrappers = document.querySelectorAll(`.${imageWrapperClassName}`);

    const imageOnLoadHandler = (e, wrapper) => {
      e.target.className += ` ${imageClassName}--loaded`;
      wrapper.className += ` ${imageWrapperClassName}--loaded`;

      e.target.removeEventListener('load', imageOnLoadHandler);
    };

    Array.from(imageWrappers).forEach(wrapper => {
      const src = getDataAttribute(wrapper, 'src');

      const image = new Image();
      image.src = src;
      image.className = imageClassName;
      image.addEventListener('load', e => imageOnLoadHandler(e, wrapper));

      if (!wrapper.children.length) {
        wrapper.appendChild(image);
      }
    });
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

    console.log('in intersectionObserver');

    loader.style.visibility = 'visible';
    const newsData = await news.getNews(page);
    loader.style.visibility = 'hidden';

    document.querySelector('.source-news__list').insertAdjacentHTML(
      'beforeEnd',
      newsItemTemplate({ news: newsData })
    );
    this.displayImagesOnLoad();
  };

  render = rootElement => {
    this.getTemplate().then(template => {
      renderTemplate(template, rootElement, 'source-news');
      this.setup();
    });
  }
}
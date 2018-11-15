import { getDataAttribute, renderTemplate } from '../../../../utils';
import { pagination } from '../../../../services/pagination';

const template = require('./news-source-list.handlebars');

import './news-source-list.scss';

export class NewsSourceList {
  getTemplate = async () => {
    const pageSources = await pagination.getPageSources();
    return template({ sources: pageSources });
  };

  setupNewsSources = () => {
    const seeNewsButtons = document.querySelectorAll('.news-source__news-btn');
    Array.from(seeNewsButtons).forEach(element => element.addEventListener('click', this.navigateToNews));
  };

  navigateToNews = e => {
    const sourceId = getDataAttribute(e.currentTarget, 'source');
    window.router.navigateTo(`/news-source/${sourceId}`);
  };

  render = rootElement => {
    this.getTemplate().then(template => {
      renderTemplate(template, rootElement, 'news-source-list');

      this.setupNewsSources();
    });
  }
}
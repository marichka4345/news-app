import { fetchSources } from '../../../../utils/fetchData';
import { renderTemplate } from '../../../../utils/templates';
import { sources } from '../../../../services/sources';
import { pagination } from '../../../../services/pagination';
import { getDataAttribute } from '../../../../utils/dataAttributes';

const template = require('./news-source-list.handlebars');

import './news-source-list.scss';

export class NewsSourceList {
  getTemplate = () => {
    const sourcesData = sources.filteredData;
    return sourcesData
      ? template({ sources: pagination.pageSources })
      : fetchSources().then(sources => template({sources}));
  };

  setupNewsSources = () => {
    const seeNewsButtons = document.querySelectorAll('.news-source__news-btn');
    Array.from(seeNewsButtons).forEach(element => element.addEventListener('click', this.navigateToNews));
  };

  navigateToNews = e => {
    const sourceId = getDataAttribute(e.target, 'source');
    window.router.navigateTo(`/news-source/${sourceId}`, { data: sources.filteredData });
  };

  render = async (rootElement) => {
    const template = await this.getTemplate();
    renderTemplate(template, rootElement, 'news-source-list');

    this.setupNewsSources();
  }
}
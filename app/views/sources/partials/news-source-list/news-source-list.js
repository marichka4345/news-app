import { fetchSources } from '../../../../utils/fetchData';
import { renderTemplate } from '../../../../utils/templates';
import { sources } from '../../../../services/sources';

const template = require('./news-source-list.handlebars');

import './news-source-list.scss';

export class NewsSourceList {
  getTemplate = () => {
    const sourcesData = sources.filteredData;
    return sourcesData
      ? template({ sources: sourcesData })
      : fetchSources().then(sources => template({sources}));
  };

  render = async (rootElement) => {
    this.template = await this.getTemplate();
    renderTemplate(this.template, rootElement, 'news-source-list');
  }
}
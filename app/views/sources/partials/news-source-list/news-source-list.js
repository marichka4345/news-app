import { fetchSources } from '../../../../utils/fetchData';
import { renderTemplate } from '../../../../utils/templates';
import { sources } from '../../../../services/sources';
import { pagination } from '../../../../services/pagination';

const template = require('./news-source-list.handlebars');

import './news-source-list.scss';

export class NewsSourceList {
  getTemplate = () => {
    const sourcesData = sources.filteredData;
    return sourcesData
      ? template({ sources: pagination.pageSources })
      : fetchSources().then(sources => template({sources}));
  };

  render = async (rootElement) => {
    const template = await this.getTemplate();
    renderTemplate(template, rootElement, 'news-source-list');
  }
}
import { fetchSources } from '../../../../utils/fetchData';
import { renderTemplate } from '../../../../utils/templates';

const template = require('./news-source-list.handlebars');

import './news-source-list.scss';

export class NewsSourceList {
  getTemplate = () => {
    return fetchSources().then(sources => template({ sources }));
  };

  render(rootElement) {
    this.getTemplate().then(template => {
        renderTemplate(template, rootElement, 'news-source-list')
      }
    );
  }
}
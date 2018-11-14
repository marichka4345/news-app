import { getDataAttribute, renderTemplate } from '../../../../utils';
import { sources } from '../../../../services/sources';
import { news } from '../../../../services/news';

const template = require('./filtered-source-list.handlebars');

import './filtered-source-list.scss';

export class FilteredSourceList {
  getTemplate = async () => {
    const filteredData = await sources.getFilteredSources();
    return template({ filteredData });
  };

  setup = () => {
    const activeSource = document.querySelector('.filtered-source--active');

    if (!activeSource) {
      const sources = document.querySelectorAll('.filtered-source');
      for (let i = 0; i < sources.length; i++) {
        const source = getDataAttribute(sources[i], 'source');

        if (source === news.source) {
          sources[i].className += ' filtered-source--active';
          break;
        }
      }
    }

    document.querySelector('.filtered-source-list').addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        return;
      }

      const sourceElement = e.target;
      const activeSource = document.querySelector('.filtered-source--active');
      if (activeSource) {
        activeSource.className = 'filtered-source';
      }
      sourceElement.className += ' filtered-source--active';

      const sourceId = getDataAttribute(sourceElement, 'source');
      window.router.navigateTo(`news-source/${sourceId}`);
    });
  };

  render = rootElement => {
    this.getTemplate().then(template => {
      renderTemplate(template, rootElement, 'filtered-source-list');

      this.setup();
    });
  }
}
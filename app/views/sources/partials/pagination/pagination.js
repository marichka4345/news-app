import { renderTemplate } from '../../../../utils/templates';
import { sources } from '../../../../services/sources';
import { pagination } from '../../../../services/pagination';
import { SOURCES_PER_PAGE } from '../../../../constants/sources-pagination';

const template = require('./pagination.handlebars');

import './_pagination.scss';

const MAX_PAGES_NUMBER = 4;

export class Pagination {
  getTemplate = () => {
    this.getRange();
    return template({ range: this.range });
  };

  pageClickHandler = ({ target }) => {
    if (target.className.includes('pages__page')) {
      pagination.setCurrentPage(target.innerHTML);

      const activePage = document.querySelector('.pages__page--active');
      if (activePage) {
        activePage.className = 'pages__page';
      }
      target.className += ' pages__page--active';
    }
  };

  setupPagination = () => {
    document.querySelector('.pages').addEventListener('click', this.pageClickHandler);

    if (this.count > this.range[this.range.length - 1]) {
      document.querySelectorAll('.pages__navigation')[1].style.visibility = 'visible';
    }
  };

  getRange = () => {
    this.count = Math.ceil(sources.filteredData.length / SOURCES_PER_PAGE);

    if (this.count <= 4) {
      this.createRange(1, this.count);
    }

    if (this.count > 4) {
      this.createRange(1, MAX_PAGES_NUMBER);
    }
  };

  createRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    this.range = range;
  };

  render(rootElement) {
    const template = this.getTemplate();
    renderTemplate(template, rootElement, 'pagination');

    this.setupPagination();
  }
}
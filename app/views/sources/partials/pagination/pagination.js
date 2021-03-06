import { renderTemplate } from '../../../../utils';
import { setElementActiveClass } from '../../../../utils/templates';
import { sources } from '../../../../services/sources';
import { pagination } from '../../../../services/pagination';
import {
  MAX_PAGES_NUMBER,
  SOURCES_PER_PAGE
} from '../../../../constants';

const template = require('./pagination.handlebars');
const pagesTemplate = require('./partials/pages.handlebars');

import './pagination.scss';

const PAGE_CLASS_NAME = 'pages__page';

export class Pagination {
  getCount = async () => {
    if (!this.count) {
      const sourcesData = await sources.getFilteredSources();
      this.count = Math.ceil(sourcesData.length / SOURCES_PER_PAGE);
    }
  };

  getTemplate = () => {
    return template({ range: JSON.stringify(this.range) });
  };

  setActiveClass = page => {
    setElementActiveClass(page, PAGE_CLASS_NAME);
  };

  pageClickHandler = ({ target }) => {
    if (target.className.includes(PAGE_CLASS_NAME)) {
      const selectedPageNumber = Number(target.innerHTML);
      pagination.setCurrentPage(selectedPageNumber);

      this.setActiveClass(target);

      const prevButton = document.querySelector('.pages__navigation--prev');
      const nextButton = document.querySelector('.pages__navigation--next');
      if (selectedPageNumber !== 1) {
        prevButton.style.visibility = 'visible';
      } else {
        prevButton.style.visibility = 'hidden';
      }

      if (this.count > pagination.pageNumber) {
        nextButton.style.visibility = 'visible';
      } else {
        nextButton.style.visibility = 'hidden';
      }
    }
  };

  nextClickHandler = e => {
    pagination.next();
    this.setCurrentPageActive();

    const { pageNumber } = pagination;
    if (pageNumber % MAX_PAGES_NUMBER === 1) {
      const options = { isFirstPageActive: true };
      const startPage = pageNumber;
      this.rerenderPageNumbers(options, startPage);
    }

    if (this.count === pageNumber) {
      e.target.style.visibility = 'hidden';
    }

    const prevButton = document.querySelector('.pages__navigation--prev');
    prevButton.style.visibility = 'visible';
  };

  prevClickHandler = e => {
    pagination.prev();
    this.setCurrentPageActive();

    const { pageNumber } = pagination;

    if (pageNumber === 1) {
      e.target.style.visibility = 'hidden';
    }

    if (pageNumber % MAX_PAGES_NUMBER === 0) {
      const options = { isFirstPageActive: false };
      const startPage = pageNumber - MAX_PAGES_NUMBER + 1;
      this.rerenderPageNumbers(options, startPage);
    }

    const nextButton = document.querySelector('.pages__navigation--next');
    nextButton.style.visibility = 'visible';
  };

  rerenderPageNumbers = (options, startPage) => {
    this.getRange(startPage);
    const template = pagesTemplate({ range: this.range });

    const pagesListElement = document.querySelector('.pages__pages-list');
    pagesListElement.innerHTML = '';
    pagesListElement.insertAdjacentHTML('afterBegin', template);

    this.setupPagination(options);
  };

  setCurrentPageActive = () => {
    const pages = document.querySelectorAll(`.${PAGE_CLASS_NAME}`);
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (page.innerHTML === String(pagination.pageNumber)) {
        this.setActiveClass(page);
        break;
      }
    }
  };

  setupPagination = ({ isFirstPageActive }) => {
    const nextButton = document.querySelector('.pages__navigation--next');
    const prevButton = document.querySelector('.pages__navigation--prev');
    [nextButton, prevButton].forEach(element => element.style.visibility = 'hidden');

    if (isFirstPageActive) {
      const firstPageNumber = document.querySelector('.pages__page');
      const pageNumber = Number(firstPageNumber.innerHTML);
      pagination.setCurrentPage(pageNumber);
      this.setActiveClass(firstPageNumber);
    } else {
      const pageElement = Array.from(document.querySelectorAll(`.${PAGE_CLASS_NAME}`))
        .filter(element => element.innerHTML === String(pagination.pageNumber))[0];
      const pageNumber = Number(pageElement.innerHTML);
      pagination.setCurrentPage(pageNumber);
      this.setActiveClass(pageElement);
    }

    nextButton.addEventListener('click', this.nextClickHandler);
    if (this.count > pagination.pageNumber) {
      nextButton.style.visibility = 'visible';
    }

    prevButton.addEventListener('click', this.prevClickHandler);
    if (pagination.pageNumber > 1) {
      prevButton.style.visibility = 'visible';
    }

    document.querySelector('.pages').addEventListener('click', this.pageClickHandler);
  };

  getRange = (startPage = 1) => {
    if (this.count <= MAX_PAGES_NUMBER) {
      this.createRange(1, this.count + 1);
    } else {
      const pagesLeft = this.count - startPage;
      const endPage = pagesLeft < MAX_PAGES_NUMBER
        ? startPage + pagesLeft + 1
        : startPage + MAX_PAGES_NUMBER;
      this.createRange(startPage, endPage);
    }
  };

  createRange = (start, end) => {
    const range = [];
    for (let i = start; i < end; i++) {
      range.push(i);
    }
    this.range = range;
  };

  render = async (rootElement) => {
    await this.getCount();
    this.getRange();
    const template = this.getTemplate();
    renderTemplate(template, rootElement, 'pagination');

    const options = { isFirstPageActive: true };
    this.setupPagination(options);
  }
}
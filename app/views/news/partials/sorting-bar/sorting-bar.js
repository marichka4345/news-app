import { renderTemplate, setElementActiveClass } from '../../../../utils';
import { SORTING_INFO } from '../../../../constants';
import { sorting } from '../../../../services/sorting';

const template = require('./sorting-bar.handlebars');

import './sorting-bar.scss';

const ITEM_CLASS_NAME = 'sorting-bar__item';

export class SortingBar {
  template = template({ items: Object.keys(SORTING_INFO) });

  setup = () => {
    const activeItem = document.querySelector(`.${ITEM_CLASS_NAME}--active`);

    if (!activeItem) {
      const firstItem = document.querySelector(`.${ITEM_CLASS_NAME}`);
      firstItem.className += ` ${ITEM_CLASS_NAME}--active`;

      sorting.setActive(firstItem.innerHTML.toLowerCase());
    }

    const sortingBar = document.querySelector('.sorting-bar');
    sortingBar.addEventListener('click', this.clickHandler);
  };

  clickHandler = e => {
    if (e.target === e.currentTarget) {
      return;
    }

    this.setActiveClass(e.target);
  };

  setActiveClass = item => {
    sorting.setActive(item.innerHTML.toLowerCase());
    setElementActiveClass(item, ITEM_CLASS_NAME);
  };

  render = (rootElement) => {
    renderTemplate(this.template, rootElement, 'sorting-bar');
    this.setup();
  }
}
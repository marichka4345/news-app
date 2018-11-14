import { filtersData } from '../../../../constants';
import {
  getDataAttribute, setDataAttribute, renderTemplate
} from '../../../../utils';
import { filters } from '../../../../services/filters';

const template = require('./filter-list.handlebars');

import './filter-list.scss';

export class FilterList {
  template = template({ filters: filtersData });

  setupFilters = () => {
    const filters = Array.from(document.querySelectorAll('.filter'));

    filters.forEach(filter => {
      const { children } = filter;

      const optionTitleElement = children[0];
      const optionsElement = children[1];

      optionTitleElement.addEventListener(
        'click',
        ({ target }) => this.toggleOptionsVisibility(target, optionsElement)
      );
      optionsElement.addEventListener(
        'click',
        this.toggleFilterAppliance
      );
    });
  };

  toggleOptionsVisibility = (titleElement, optionsElement) => {
    const { clientHeight } = optionsElement;
    const titleAttributeName = 'open';

    if (!clientHeight) {
      optionsElement.style.height = '100%';
      setDataAttribute(titleElement, titleAttributeName, 'collapsed');
    } else {
      optionsElement.style.height = '0';
      setDataAttribute(titleElement, titleAttributeName, 'closed');
    }
  };

  toggleFilterAppliance = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      return;
    }

    const option = target;
    const optionAttribute = 'selected';

    const isSelected = getDataAttribute(option, optionAttribute) === 'true';
    setDataAttribute(option, 'selected', String(!isSelected));

    const filterElement = option.parentElement.parentElement;
    const { id } = filterElement;
    const labelsElement = filterElement.querySelector('.filter__labels');

    const filterValue = option.innerHTML;
    const filter = { id, filterValue };

    if (!isSelected) {
      renderTemplate(filterValue, labelsElement, 'filter__label');
      filters.addFilter(filter);
    } else {
      const labels = Array.from(labelsElement.children);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];

        if (label.innerHTML === filterValue) {
          labelsElement.removeChild(label);
          filters.removeFilter(filter);
          break;
        }
      }
    }
  };

  render(rootElement) {
    renderTemplate(this.template, rootElement, 'filter-list');

    this.setupFilters();
  }
}
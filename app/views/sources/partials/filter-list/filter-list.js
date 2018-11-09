import { filtersData } from '../../../../constants/filters';
import { getDataAttribute, setDataAttribute } from '../../../../utils/dataAttributes';
import { renderTemplate } from '../../../../utils/templates';

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
        ({ target }) => this.toggleFilterAppliance(target)
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

  toggleFilterAppliance = option => {
    const optionAttribute = 'selected';

    const isSelected = getDataAttribute(option, optionAttribute) === 'true';
    setDataAttribute(option, 'selected', String(!isSelected));

    const selectedTagsElement = option.parentElement.parentElement.querySelector('.filter__labels');
    if (!isSelected) {
      const element = document.createElement('div');
      element.classList.add('filter__label');
      element.innerHTML = option.innerHTML;
      selectedTagsElement.appendChild(element);
    } else {
      const selectedTags = Array.from(selectedTagsElement.children);

      for (let i = 0; i < selectedTags.length; i++) {
        const tag = selectedTags[i];

        if (tag.innerHTML === option.innerHTML) {
          selectedTagsElement.removeChild(tag);
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
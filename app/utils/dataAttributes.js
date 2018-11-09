export const setDataAttribute = (element, name, value) => {
  element.setAttribute(`data-${name}`, value);
};

export const getDataAttribute = (element, name) =>
  element.getAttribute(`data-${name}`);
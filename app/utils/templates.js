export const renderTemplate = (template, root, className) => {
  if (root.querySelector(`.${className}`)) {
    return;
  }

  const div = document.createElement('div');
  div.className += className;
  div.innerHTML = template;
  root.appendChild(div);
};

export const rerenderTemplate = (component, root, className) => {
  const element = document.querySelector(`.${className}`);
  if (element) {
    root.removeChild(element);
  }
  new component().render(root);
};
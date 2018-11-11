export const renderTemplate = (template, root, className) => {
  const div = document.createElement('div');
  div.className += className;
  div.innerHTML = template;
  root.appendChild(div);
};
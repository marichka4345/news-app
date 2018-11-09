export const renderTemplate = (template, root, className) => {
  const div = document.createElement('div');
  div.classList.add(className);
  div.innerHTML = template;
  root.appendChild(div);
};
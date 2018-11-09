import '@babel/polyfill';
import { Sources } from './views/sources/sources';

import './styles/index.scss';

document.addEventListener('DOMContentLoaded', function() {
  new Sources().render(document.body);
});
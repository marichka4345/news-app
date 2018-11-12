import '@babel/polyfill';
import * as Router from 'vanilla-router';

import { Sources } from './views/sources/sources';
import { News } from './views/news/news';

import { news } from './services/news';

import './styles/index.scss';

const router = new Router();

const rootElement = document.body;

document.addEventListener('DOMContentLoaded', function() {
  router
    .add('', () => {
      rootElement.innerHTML = '';
      new Sources().render(rootElement);
    })
    .add('news-source/(:any)', source => {
      rootElement.innerHTML = '';
      news.setSource(source);
      new News().render(rootElement)
    })
    .addUriListener();

  router.navigateTo('/');
  window.router = router;
});
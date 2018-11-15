import '@babel/polyfill';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

import * as Router from 'vanilla-router';

import { Sources } from './views/sources/sources';
import { News } from './views/news/news';

import { news } from './services/news';

import './styles/index.scss';

if (!window.fetch) {
  window.fetch = fetchPolyfill;
}

if (!window.IntersectionObserver) {
  require('intersection-observer');
}

const router = new Router();

const rootElement = document.body;

document.addEventListener('DOMContentLoaded', function() {
  router
    .add('', () => {
      rootElement.innerHTML = '';
      new Sources().render(rootElement);
    })
    .add('news-source/(:any)', source => {
      console.log('in route 2');
      rootElement.innerHTML = '';
      news.setSource(source);
      new News().render(rootElement)
    })
    .addUriListener();

  router.navigateTo('/');
  window.router = router;
});
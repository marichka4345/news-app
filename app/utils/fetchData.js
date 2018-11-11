import { fetch as fetchPolyfill } from 'whatwg-fetch';

const fetch = window.fetch || fetchPolyfill;

export const fetchSources = () => {
  return fetch('https://newsapi.org/v2/sources?apiKey=abb27eb2154e472a8114c71c096b8a70')
    .then(response => response.json())
    .then(({ sources }) => {
      localStorage.setItem('sources', JSON.stringify(sources));
      localStorage.setItem('sources_date', new Date().toString());
      return sources;
    });
};

export const fetchSourceNews = source => {
  return fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=abb27eb2154e472a8114c71c096b8a70`)
};
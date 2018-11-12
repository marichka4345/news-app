import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { PAGE_SIZE } from '../constants/news';

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

export const getLocalSources = () => {
  return JSON.parse(localStorage.getItem('sources'));
};

export const getSourcesLastDate = () => {
  return new Date(localStorage.getItem('sources_date')).getTime();
};

export const fetchSourceNews = (source, page = '1') => {
  if (!source) {
    return;
  }

  return fetch(`https://newsapi.org/v2/everything?sources=${source}&page=${page}&apiKey=abb27eb2154e472a8114c71c096b8a70`)
    .then(response => response.json())
    .then(({ articles }) => {
      const localNews = JSON.parse(localStorage.getItem(`articles-${source}`)) || [];

      const newsData = localNews.length
        ? [ ...localNews, ...articles ]
        : articles;

      const news = JSON.stringify(newsData);
      localStorage.setItem(`articles-${source}`, news);
      localStorage.setItem(`articles-${source}_date`, new Date().toString());
      return newsData;
    });
};

export const getLocalNews = (source, page = 1) => {
  const localNews = localStorage.getItem(`articles-${source}`);

  if (!localNews) {
    return [];
  }

  const parsedNews = JSON.parse(localNews);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  if (startIndex > parsedNews.length - 1) {
    return [];
  }
  return parsedNews.slice(startIndex, endIndex);
};

export const getNewsLastDate = source => {
  return new Date(localStorage.getItem(`articles-${source}_date`)).getTime();
};
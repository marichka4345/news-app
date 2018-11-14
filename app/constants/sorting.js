import { fetchEverythingUrl, fetchHeadlinesUrl } from './apiUrls';

const getUrl = (fetchUrl, source, page) => {
  return `${fetchUrl}&sources=${source}&page=${page}`
};

export const SORTING_INFO = {
  latest(source, page) {
    return getUrl(fetchEverythingUrl, source, page) + '&sortBy=publishedAt';
  },
  top(source, page) {
    return getUrl(fetchHeadlinesUrl, source, page);
  },
  popular(source, page) {
    return getUrl(fetchEverythingUrl, source, page) + '&sortBy=popularity';
  }
};
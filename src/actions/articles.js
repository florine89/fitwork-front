export const ARTICLES_FETCH = 'ARTICLES_FETCH';

export function fetchArticles() {
  return {
    type: ARTICLES_FETCH,
  };
}

export const ARTICLES_SAVE = 'ARTICLES_SAVE';

export function saveArticles(articles) {
  return {
    type: ARTICLES_SAVE,
    payload: { articles },
  };
}

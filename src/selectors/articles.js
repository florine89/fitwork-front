/* eslint-disable import/prefer-default-export */

/* export function findArticle(articles, searchedId) {
  const article = articles.find((testedArticle) => {
    console.log('testedArticle.id', testedArticle.id);
    console.log('searchedId', searchedId);
    return testedArticle.id === searchedId;
  });
  console.log('article', article);
  return article;
} */

export function getArticlesList(state) {
  console.log('getArticlesList', state.articles.list);
  return state.articles.list;
}

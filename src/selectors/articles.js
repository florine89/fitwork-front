/* eslint-disable import/prefer-default-export */

export function findCategories(articles, searchedId) {
  // testedarticles.name ou id
  const article = articles.find((testedarticles) => testedarticles.articles === searchedId);
  console.log(article.articles);
  return article;
}

export function getArticlesList(state) {
  console.log(state.articles.list);
  return state.articles.list;
}

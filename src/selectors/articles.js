/* eslint-disable import/prefer-default-export */

export function findArticle(articles, searchedId) {
  const article = articles.find((testedRecipe) => testedRecipe.id === searchedId);
  console.log(article);
  return article;
}

export function getArticlesList(state) {
  // console.log(state.articles.list);
  return state.articles.list;
}

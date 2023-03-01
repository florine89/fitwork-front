/* eslint-disable import/prefer-default-export */

export function findCategories(categories, searchedId) {
  // testedcategories.name ou id
  const category = categories.find((testedcategories) => testedcategories.name === searchedId);
  console.log(category.name);
  return category;
}

export function getCategoriesList(state) {
  // console.log(state.categories.list);
  return state.categories.list;
}

/* eslint-disable import/prefer-default-export */

export function findCategories(categories, searchedId) {
  const category = categories.find((testedCategory) => {
    console.log('testedACategory.id', testedCategory.id);
    console.log('searchedId', searchedId);
    return testedCategory.id === searchedId;
  });
  console.log('category', category);
  return category;
}

export function getCategoriesList(state) {
  // console.log(state.categories.list);
  return state.categories.list;
}

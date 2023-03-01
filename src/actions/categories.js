export const CATEGORIES_FETCH = 'CATEGORIES_FETCH';

export function fetchCategories() {
  return {
    type: CATEGORIES_FETCH,
  };
}

export const CATEGORIES_SAVE = 'CATEGORIES_SAVE';

export function saveCategories(name) {
  return {
    type: CATEGORIES_SAVE,
    payload: { name },
  };
}

// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';

import categoriesReducer from './categories';
import userReducer from './user';
import articlesReducer from './articles';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  user: userReducer,
  articles: articlesReducer,
});

export default rootReducer;

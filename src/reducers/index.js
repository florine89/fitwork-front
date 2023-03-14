// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';

import categoriesReducer from './categories';
import userReducer from './user';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  user: userReducer,
});

export default rootReducer;

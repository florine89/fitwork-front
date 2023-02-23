// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';

import articlesReducer from './articles';
import userReducer from './user';

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
});

export default rootReducer;

// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';

import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;

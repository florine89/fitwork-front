// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore } from 'redux';

import reducer from '../reducers';

const store = createStore(reducer);

export default store;

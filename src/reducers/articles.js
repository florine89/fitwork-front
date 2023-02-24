import { ARTICLES_SAVE } from '../actions/articles';

export const initialState = {
  list: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ARTICLES_SAVE:
      return {
        ...state,
        // list: action.payload.articles,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;

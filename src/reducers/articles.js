import { CATEGORIES_SAVE } from '../actions/articles';

export const initialState = {
  list: [],
  loading: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CATEGORIES_SAVE:
      return {
        ...state,
        list: action.payload.name,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;

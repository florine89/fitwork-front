import { CHANGE_INPUT_VALUE, LOGIN } from '../actions/user';

export const initialState = {
  logged: false,
  email: '',
  password: '',
  loading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case LOGIN: {
      return state;
    }

    default:
      return state;
  }
};

export default reducer;

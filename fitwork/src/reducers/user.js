import { LOGIN } from '../actions/user';

export const initialState = {
  logged: false,
  email: '',
  password: '',
  loading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;

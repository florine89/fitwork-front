import { CHANGE_INPUT_VALUE, LOGIN, USER_SAVE } from '../actions/user';

export const initialState = {
  logged: false,
  email: '',
  password: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case LOGIN: {
      // ajout du state "logged"
      if (!state.logged) {
        return {
          ...state,
        };
      }
      return state;
    }

    case USER_SAVE:
      return {
        ...state,
        ...action.payload.user,
        email: '',
        password: '',
      };

    default:
      return state;
  }
};

export default reducer;

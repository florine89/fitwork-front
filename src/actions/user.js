export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login() {
  return {
    type: LOGIN,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}

export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';

export function changeInputValue(key, value) {
  return {
    type: CHANGE_INPUT_VALUE,
    payload: {
      key,
      value,
    },
  };
}

export const USER_SAVE = 'USER_SAVE';

export function saveUser(user) {
  return {
    type: USER_SAVE,
    payload: { user },
  };
}

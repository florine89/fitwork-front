// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import axios from 'axios';

import { LOGIN, LOGOUT, saveUser } from '../actions/user';
import { CATEGORIES_FETCH, saveCategories } from '../actions/categories';

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

const getAPI = (store) => (next) => async (action) => {
  switch (action.type) {
    case CATEGORIES_FETCH:
      try {
        const response = await instance.get('/categories');
        // console.log(response);
        store.dispatch(saveCategories(response.data));
      }
      catch (error) {
        console.error(error);
      }

      next(action);
      break;

    case LOGIN: {
      try {
        const { email, password } = store.getState().user;

        const response = await instance.post('/login', {
          email,
          password,
        });

        // ajout de l'authorisation dans les headers avec la doc axios
        instance.defaults.headers.common.Authorization = (
          `Bearer ${response.data.token}`
        );

        // Mémorisation du token dans le local storage
        localStorage.setItem('token', response.data.token);

        delete response.data.token;

        store.dispatch(saveUser(response.data));
      }
      catch (error) {
        console.error(error);
      }
      next(action);
      break;
    }
    case LOGOUT:
      // on vide le local storage à la déconnection
      localStorage.removeItem('token');

      delete instance.defaults.headers.common.Authorization;
      next(action);
      break;

    default:
      next(action);
  }
};

export default getAPI;

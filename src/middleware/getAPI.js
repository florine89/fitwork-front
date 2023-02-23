// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import axios from 'axios';

import { LOGIN, saveUser } from '../actions/user';
import { ARTICLES_FETCH, saveArticles } from '../actions/articles';

const API_BASE_URL = 'http://localhost:3001';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const getAPI = (store) => (next) => async (action) => {
  switch (action.type) {
    case ARTICLES_FETCH:
      try {
        const response = await instance.get('/recipes'); // test route avec API externe
        console.log(response);
        store.dispatch(saveArticles(response.data));
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
        // console.log(response.data.token);
        // console.log(response.data.pseudo);

        // ajout d'une instance avec la doc axios
        instance.defaults.headers.common.Authorization = (
          `Bearer ${response.data.token}`
        );

        // Mémorisation du token

        delete response.data.token;
        store.dispatch(saveUser(response.data));
      }
      catch (error) {
        console.error(error);
      }
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default getAPI;

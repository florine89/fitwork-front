// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import axios from 'axios';

import { useSelector } from 'react-redux';

import { LOGIN, LOGOUT, saveUser } from '../actions/user';
import { CATEGORIES_FETCH, saveCategories } from '../actions/categories';
// import { ARTICLES_FETCH, saveArticles } from '../actions/articles';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const getAPI = (store) => (next) => async (action) => {
  switch (action.type) {
    /* case ARTICLES_FETCH:
      try {
        // const categories = useSelector(findCategories);
        // console.log('categories', categories);
        // const { id } = useParams();
        // console.log('id de la catégorie', id);

        // const id = useSelector((state) => state.name.id);
        // console.log(id);

        const id = useSelector((state) => state.name.id);
        console.log(id);
        const response = await axios.get(`${API_BASE_URL}/category/${id}`);
        console.log('response', response);
        store.dispatch(saveArticles(response.data));
      }
      catch (error) {
        console.error(error);
      }

      next(action);
      break; */
    case CATEGORIES_FETCH:
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
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
        // console.log(response.data.token);
        // console.log(response.data.id);

        // ajout d'une instance avec la doc axios
        instance.defaults.headers.common.Authorization = (
          `Bearer ${response.data.token}`
        );

        localStorage.setItem('token', response.data.token);

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
    case LOGOUT:
      localStorage.removeItem('token');

      delete instance.defaults.headers.common.Authorization;
      next(action);
      break;

    default:
      next(action);
  }
};

export default getAPI;

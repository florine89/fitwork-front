import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { instance } from '../../middleware/getAPI';

import Header from '../AppHeader';
import Inscription from '../Inscription';
import Profil from '../Profil';
import Footer from '../Footer';
import Contact from '../Contact';
import Home from '../Accueil';
import NotFound from '../404';
import Program from '../Program';
import Articles from '../Articles';
import Article from '../Articles/Article';
import Admin from '../Admin';
import Categories from '../Categories';
import Page from '../../page';
import Favoris from '../Favorite';
import ModifyArticle from '../Admin/AdminArticles/ModifyArticle';
import About from '../About';

import { fetchCategories } from '../../actions/categories';

import { logout, saveUser } from '../../actions/user';

import './App.scss';

function App() {
  // On stock le token dans le local storage
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  /**
   * Si un token existe dans le local storage, on le teste en faisant un appel l'API
   * --> s'il est valide, on passe la réponse dans le SAVE USER (state Redux), on reconnecte le user
   * Si le token est différent, on passe dans le catch, et on vide le local storage (logout)
   */
  function checkConnexion() {
    if (token) {
      // Header par défaut pour le premier rendu de la page
      instance.defaults.headers.common.Authorization = (
        `Bearer ${token}`
      );
      instance
        .get('/token')
        .then((response) => {
          dispatch(saveUser(response.data));
        })
        .catch((error) => {
          console.error(error);
          dispatch(logout());
        });
    }
  }

  /**
   * Pour faire persister la connection, au premier rendu, on a besoin de vérifier
   * la connexion (token), si on a pas de token, on sort du useEffect
   * On a également besoin de la liste des catégories (menu)
   */
  useEffect(() => {
    checkConnexion();
    dispatch(fetchCategories());
  }, []);

  // Permet de faire les redirection dans le front
  const isLogged = useSelector((state) => state.user.logged);

  return (

    <Page>
      <div className="App">

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/inscription"
            element={<Inscription />}
          />
          <Route
            path="/profil"
            element=<Profil />
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/administrateur" element={<Admin />} />
          <Route path="/administrateur/article/:id" element={<ModifyArticle />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categorie/:id" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/programme"
            element={(
            isLogged
              ? <Program />
              : <Navigate to="/" replace />
          )}
          />
          <Route
            path="/favoris"
            element={(
            isLogged
              ? <Favoris />
              : <Navigate to="/" replace />
          )}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Page>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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

import { login, logout } from '../../actions/user';

import './App.scss';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);

  const dispatch = useDispatch();

  function connexion() {
    if (token) {
      instance.get('/token')
        .then((response) => {
          dispatch(login());
        })
        .catch((error) => {
          console.error(error);
          dispatch(logout());
        });
    }
  }

  useEffect(() => {
    connexion();
    dispatch(fetchCategories());
  }, []);

  /*   Pour faire persister la connexion, il faut un useEffect dans le composant App qui
sera déclenché au premier chargement de l'application.
Dans ce useEffect, si on a pas de token, on sort du useEffect (pas la peine d'envoyer
la requête pour vérif le token, on en a pas)
Si on a un token, on envoie une requête en get au back qui va vérifier ce token :
Si il est toujours valide (pas d'erreur dans la réponse) on repasse nourrir le store
avec les infos nécéssaires (normalement le back vous envoie les même data qu'au login,
donc vous dispatcher la même action)
Si le token n'est plus valide, on passe dans le catch => on vide le localStorage */

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
          <Route path="/a-propos" element={<About />} />
          <Route path="/administrateur" element={<Admin />} />
          <Route path="/administrateur/article/:id" element={<ModifyArticle />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categorie/:id" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/programme" element={<Program />} />
          <Route path="/favoris" element={<Favoris />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Page>
  );
}

export default App;

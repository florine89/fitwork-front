import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../AppHeader';
import Inscription from '../Inscription';
import Profil from '../Profil';
import Footer from '../Footer';
import Contact from '../Contact';
import Home from '../Accueil';
import NotFound from '../404';
import Program from '../Program';
import Articles from '../Articles';
import Admin from '../Admin';
import Categories from '../Categories';
import Page from '../../page';
import Favoris from '../Favorite';
import { fetchCategories } from '../../actions/categories';

import './App.scss';

function App() {
  /**
   * On affiche les categories via le state de Redux (dans le menu directement)
   */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
          <Route path="/categories" element={<Categories />} />
          <Route path="/categorie/:id" element={<Articles />} />
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

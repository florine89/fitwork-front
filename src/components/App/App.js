import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

// import Categories from '../Categories';

import { fetchCategories } from '../../actions/categories';
import { fetchArticles } from '../../actions/articles';

import './App.scss';
import Categories from '../Categories';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchArticles());
  }, []);

  return (
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
        <Route path="/favoris" element={<h1>favoris</h1>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;

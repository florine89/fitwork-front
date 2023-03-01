import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../AppHeader';
import Inscription from '../Inscription';
import Profil from '../Profil';
import Footer from '../Footer';
import Contact from '../Contact';
import Home from '../Accueil';
import Categories from '../Categories';
import NotFound from '../404';
import Program from '../Program';

import { fetchCategories } from '../../actions/categories';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.logged);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/inscription"
          element={(
          isLogged
            ? <Home />
            : <Inscription to="/" replace />)}
        />
        <Route
          path="/profil"
          element=<Profil />
        />
        <Route path="/contact" element={<Contact />} />

        <Route path="/categorie" element={<h1>Catégorie</h1>} />
        <Route path="/categorie/:id" element={<Categories />} />
        <Route path="/programme" element={<Program />} />
        <Route path="/favoris" element={<h1>favoris</h1>} />

        <Route path="/administrateur" element={<h1>Administrateur</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;

import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../AppHeader';
import Inscription from '../Inscription';
import Profil from '../Profil';
import Footer from '../Footer';

import './App.scss';
import Contact from '../Contact';
import Home from '../Accueil';

function App() {
  const isLogged = useSelector((state) => state.user.logged);

  const [change, setChange] = useState('');

  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription change={change} setChange={setChange} />} />
        <Route
          path="/profil"
          element={
            isLogged
              ? <Profil />
              : <Navigate to="/inscription" replace />
          }
        />
        <Route path="/contact" element={<Contact />} />

        <Route path="/categorie" element={<h1>Catégorie</h1>} />
        <Route path="/categorie/:id" element={<h1>Articles</h1>} />
        <Route path="/programme" element={<h1>Programme</h1>} />
        <Route path="/favoris" element={<h1>favoris</h1>} />

        <Route path="/administrateur" element={<h1>Administrateur</h1>} />
        <Route path="*" element={<h1>Page d'erreur</h1>} />
      </Routes>

      <Footer />


    </div>
  );
}

export default App;

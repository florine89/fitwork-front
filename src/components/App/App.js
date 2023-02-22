import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Footer from '../Footer';

import Header from '../AppHeader';
import Inscription from '../Inscription';
import LoginForm from '../LoginForm';
import Profil from '../Profil';

import './App.scss';
import Contact from '../Contact';

function App() {
  const isLogged = useSelector((state) => state.user.logged);

  const [change, setChange] = useState('');

  return (
    <div className="App">

      <Header />
      <Footer />

      <Routes>
        <Route path="/" element={<LoginForm />} />
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

    </div>
  );
}

export default App;

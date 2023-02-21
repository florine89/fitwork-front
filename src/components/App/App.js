import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import LoginForm from '../LoginForm';
import Inscription from '../Inscription/index';
import './App.scss';
// import Inscription from '../Inscription/Inscription';
// import Button from 'react-bootstrap/Button';

// import LoginForm from '../LoginForm';

function App() {
  const [change, setChange] = useState('');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/inscription" element={<Inscription change={change} setChange={setChange} />} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/profil" element={<h1>Profil</h1>} />
        <Route path="/categorie" element={<h1>Catégorie</h1>} />
        <Route path="/categorie/:id" element={<h1>Articles</h1>} />
        <Route path="/programme" element={<h1>Programme</h1>} />
        <Route path="/favoris" element={<h1>Element</h1>} />
        <Route path="/administrateur" element={<h1>Administrateur</h1>} />
        <Route path="*" element={<h1>Page d'erreur</h1>} />
      </Routes>
    </div>
  );
}

export default App;

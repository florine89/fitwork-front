import { Route, Routes } from 'react-router-dom';
import Inscription from '../Inscription/Inscription';
import LoginForm from '../LoginForm';


import './App.scss';

function App() {
  return (
    <div className="App">
    <Routes>
      <h1>FitWork</h1>
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/connection" element={<LoginForm />} />
    </Routes>
    </div>
 );
}

export default App;

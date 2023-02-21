import Button from 'react-bootstrap/Button';
import Inscription from '../Inscription';
import './App.scss';

// import LoginForm from '../LoginForm';

function App() {
  return (
    <div className="App">
      <h1>FitWork</h1>
      <Button variant="primary">S'inscrire</Button>
      <Inscription />
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;

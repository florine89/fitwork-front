import { Button } from 'react-bootstrap';

import './App.scss';
import LoginForm from '../LoginForm';

function App() {
  return (
    <div className="App">
      <h1>FitWork</h1>

      <Button as="a" variant="primary">
        Button as link
      </Button>
      <Button as="a" variant="success">
        Button as link
      </Button>

      <LoginForm />

    </div>
  );
}

export default App;

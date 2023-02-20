import './App.scss';
import { Button } from 'react-bootstrap';

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

    </div>
  );
}

export default App;

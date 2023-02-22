import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './style.scss';

function Contact() {
  return (
    <div className="Contact">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Ecris ta remarque ici !</Form.Label>
          <Form.Control type="text" placeholder="Ecris ta remarque ici !" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Contact;

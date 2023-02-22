import { useState } from 'react';

/* eslint-disable react/jsx-no-bind */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './style.scss';

function Contact() {
  const [change, setChange] = useState('');

  function handleChange(evt) {
    setChange(evt.target.value);
    // console.log(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log('submit');
  }

  return (
    <div className="Contact">

      <Form onSubmit={handleSubmit}>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
          value={change}
          onChange={handleChange}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlSelect"
          value={change}
          onChange={handleChange}
        >
          <Form.Label>Thématique</Form.Label>
          <Form.Select aria-label="Exemple par défaut">
            <option>Choix de la thématique</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          value={change}
          onChange={handleChange}
        >
          <Form.Label>Ecris ta remarque ici !</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Envoi
        </Button>
      </Form>

    </div>
  );
}

export default Contact;

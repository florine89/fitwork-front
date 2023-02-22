/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function Profil() {
  const [validated, setValidated] = useState(false);
  // change c'est la valeur initial
  // handlechange va appeler setchange pour changer la veleur
  // usestate c'est linitialisation du state
  const [change, setChange] = useState('');

  function handleChange(evt) {
    console.log(evt.target.value);
    setChange(evt.target.value);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log('handlesubmit');
  };

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="4"
          value={change}
          onChange={handleChange}
          controlId="validationCustom01"
        >
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          value={change}
          onChange={handleChange}
          controlId="validationCustom02"
        >
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          value={change}
          onChange={handleChange}
          controlId="validationCustomUsername"
        >
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="4"
          value={change}
          onChange={handleChange}
          controlId="validationCustom03"
        >
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control type="text" placeholder="date de naissance" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Modifier mes informations</Button>
    </Form>
  );
}

export default Profil;

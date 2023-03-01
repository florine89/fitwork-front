/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function Admin() {
  const id = useSelector((state) => state.user.id);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('handlesubmit');
  };

  const categorie = useSelector((state) => state.categories);

  /* function handleChange(event) {
    if (event.target.name === 'firstname') {
      setFirstname(event.target.value);
    }
  } */

  // fonction pour modifier les informations de profil

  /* function updateProfil() {
    axios
      .patch(`${baseURL}/user/${id}`, {
        firstname,
        lastname,
        email,
        birth_date: birthday,
      })
      .then((response) => {
        console.log(response);
      });
  } */

  return (

    <Form className="Admin" noValidate validated={validated} onSubmit={handleSubmit}>

      <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlSelect"
        value="1"
        onChange={handleChange}
      >
        <Form.Label>Thématique</Form.Label>
        <Form.Select aria-label="Exemple par défaut" name="object">
          <option>Choix de la catégories</option>
          <option value="1">{data.name}</option>
        </Form.Select>
      </Form.Group>
      <Button className="Profil-button" type="submit">Modifier mes informations</Button>
    </Form>
  );
}

export default Admin;

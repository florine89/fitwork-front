// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

/* eslint-disable react/jsx-no-bind */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Style.scss';

// eslint-disable-next-line react/prop-types
export default function Inscription() {
  // const [change, setChange] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  // const value = useSelector((state) => state.value);
  function handleChange(evt) {
    // console.log(evt.target.name);
    if (evt.target.name === 'firstname') {
      setFirstname(evt.target.value);
    }
    if (evt.target.name === 'lastname') {
      setLastname(evt.target.value);
    }
    // setChange(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log('submit');
  }

  // appel API

  const baseURL = 'http://barrealexandre-server.eddi.cloud:8080/api';

  const [post, setPost] = useState(null);

  // useEffect(() => {
  //   axios.get(`${baseURL}/user`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  function createUser() {
    console.log('firstname', firstname);
    console.log('lastname', lastname);
    axios
      .post(`${baseURL}/user`, {
        firstname,
        lastname,
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formLastName" value={lastname} onChange={handleChange}>
        <Form.Label>Nom :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez votre nom"
          name="lastname"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFirstName" value={firstname} onChange={handleChange}>
        <Form.Label>Prénom :</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre prenom" name="firstname" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail" onChange={handleChange}>
        <Form.Label>Email :</Form.Label>
        <Form.Control type="email" placeholder="Entrez votre email" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
        onChange={handleChange}
      >
        <Form.Label>Mot de passe :</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday" onChange={handleChange}>
        <Form.Label>Date de naissance :</Form.Label>
        <Form.Control type="date" placeholder="Date de naissance" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formMaleCheckbox"
        onChange={handleChange}
      >
        <Form.Check type="checkbox" label="Masculin" value="Masculin" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formFemaleCheckbox"
        onChange={handleChange}
      >
        <Form.Check type="checkbox" label="Féminin" value="Feminin" />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={createUser}>
        Enregistrer
      </Button>
      <Button variant="primary" type="reset">
        Annuler
      </Button>
    </Form>
  );
}

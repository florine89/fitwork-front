// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import Alert from 'react-bootstrap/Alert';

/* eslint-disable react/jsx-no-bind */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Style.scss';
import LoginForm from '../LoginForm';

// eslint-disable-next-line react/prop-types
export default function Inscription() {
  // const [change, setChange] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  // const value = useSelector((state) => state.value);
  function handleChange(evt) {
    // console.log(evt.target.name);
    if (evt.target.name === 'firstname') {
      setFirstname(evt.target.value);
    }
    if (evt.target.name === 'lastname') {
      setLastname(evt.target.value);
    }
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    }
    if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
    if (evt.target.name === 'birthday') {
      setBirthday(evt.target.value);
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

  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   axios.get(`${baseURL}/user`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  function createUser() {
    console.log('firstname', firstname);
    console.log('lastname', lastname);
    console.log('email', email);
    console.log('password', password);
    console.log('birthday', birthday);

    axios
      .post(`${baseURL}/user`, {
        firstname,
        lastname,
        email,
        password,
        birth_date: birthday,
      })
      .then((response) => {
        setPost(response.data);
        setSuccess(true);
      });
  }

  return (
    <>
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

        <Form.Group className="mb-3" controlId="formBasicEmail" value={email} onChange={handleChange}>
          <Form.Label>Email :</Form.Label>
          <Form.Control type="email" placeholder="Entrez votre email" name="email" />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={handleChange}
          value={password}
        >
          <Form.Label>Mot de passe :</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe" name="password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthday" value={birthday} onChange={handleChange}>
          <Form.Label>Date de naissance :</Form.Label>
          <Form.Control type="date" placeholder="Date de naissance" name="birthday" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={createUser}>
          Enregistrer
        </Button>
        <Button variant="primary" type="reset">
          Annuler
        </Button>
      </Form>
      { success
        && (
        <Alert variant="dark">
          Votre compte a bien été crée !
          <Alert.Link href="/">Veuillez vous connecter içi</Alert.Link>
        </Alert>
        )}
    </>
  );
}

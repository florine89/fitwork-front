// import { useSelector } from 'react-redux';

import { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import Alert from 'react-bootstrap/Alert';

/* eslint-disable react/jsx-no-bind */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { instance } from '../../middleware/getAPI';

import logo from '../../assets/inscriptionok.jpg';

import './style.scss';

export default function Inscription() {
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
      console.log(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  const [success, setSuccess] = useState(false);

  function createUser() {
  /*     console.log('firstname', firstname);
    console.log('lastname', lastname);
    console.log('email', email);
    console.log('password', password);
    console.log('birthday', birthday); */

    instance
      .post('/user', {
        firstname,
        lastname,
        email,
        password,
        birth_date: birthday,
      })
      .then((response) => {
        setSuccess(true);
        console.log((response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="inscription">
      { !success && (
        <Form className="inscription-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formLastName" value={lastname} onChange={handleChange}>
            <Form.Label>Nom </Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre nom"
              name="lastname"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFirstName" value={firstname} onChange={handleChange}>
            <Form.Label>Prénom </Form.Label>
            <Form.Control type="text" placeholder="Entrez votre prenom" name="firstname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail" value={email} onChange={handleChange}>
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" placeholder="Entrez votre email" name="email" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={handleChange}
            value={password}
          >
            <Form.Label>Mot de passe </Form.Label>
            <Form.Control type="password" placeholder="Mot de passe" name="password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday" value={birthday} onChange={handleChange}>
            <Form.Label>Date de naissance </Form.Label>
            <Form.Control type="date" placeholder="Date de naissance" name="birthday" />
          </Form.Group>
          <div className="inscription-form_btn">
            <Button className="form-button inscription-button" variant="primary" type="submit" onClick={createUser} disabled={success}>
              Enregistrer
            </Button>
            <Button className="form-button inscription-button" variant="primary" type="reset" disabled={success}>
              Annuler
            </Button>
          </div>
        </Form>
      )}

      { success
        && (
          <div className="Message">
            <img src={logo} className="Message-logo" alt="Logo inscription" />
            <Alert variant="dark">
              <div className="Message-alert">
                <Alert.Heading className="Message-welcome">Super ! Ton compte a bien été crée !</Alert.Heading>
                <p className="Message-fitworkers">
                  Bienvenue dans la Team des Fit Workers !
                </p>
              </div>
            </Alert>
          </div>
        )}
    </div>

  );
}

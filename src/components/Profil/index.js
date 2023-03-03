/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { saveUser } from '../../actions/user';

function Profil() {
  const id = useSelector((state) => state.user.id);

  const [validated, setValidated] = useState(false);
  // change c'est la valeur initiale
  // handlechange va appeler setchange pour changer la valeur
  // usestate c'est l'initialisation du state

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    // console.log('handlesubmit');
  };

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  function handleChange(event) {
    if (event.target.name === 'firstname') {
      setFirstname(event.target.value);
    }
    if (event.target.name === 'lastname') {
      setLastname(event.target.value);
    }
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'birthday') {
      setBirthday(event.target.value);
    }
  }

  // appel API

  const baseURL = 'http://barrealexandre-server.eddi.cloud:8080/api';

  const [data, setData] = useState([]);

  function getProfil() {
    axios
      .get(`${baseURL}/user/${id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLastname(response.data.lastname);
        setFirstname(response.data.firstname);
        setEmail(response.data.email);
        setBirthday(response.data.birthday);
      });
  }

  useEffect(() => {
    getProfil();
  }, []);

  // fonction pour modifier les informations de profil
  const dispatch = useDispatch();
  function updateProfil() {
    axios
      .patch(`${baseURL}/user/${id}`, {
        firstname,
        lastname,
        email,
        birth_date: birthday,
      })
      .then((response) => {
        dispatch(saveUser(response.data));
        console.log('update user', response);
      });
  }

  return (
    <Form className="Profil" noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="4"
          value={lastname}
          onChange={handleChange}
          controlId="validationCustom01"
        >
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            name="lastname"
            defaultValue={data.lastname}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          value={firstname}
          onChange={handleChange}
          controlId="validationCustom02"
        >
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prénom"
            name="firstname"
            defaultValue={data.firstname}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          value={email}
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
              name="email"
              defaultValue={data.email}
            />
            <Form.Control.Feedback type="invalid">
              Please choose an email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="4"
          value={birthday}
          onChange={handleChange}
          controlId="validationCustom03"
        >
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="date"
            placeholder="date de naissance"
            name="birthday"
            defaultValue={data.birth_date}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="Profil-button" type="submit" onClick={updateProfil}>Modifier mes informations</Button>
    </Form>
  );
}

export default Profil;

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

function Profil() {
  const id = useSelector((state) => state.user.id);

  const [validated, setValidated] = useState(false);
  // change c'est la valeur initial
  // handlechange va appeler setchange pour changer la veleur
  // usestate c'est linitialisation du state

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
  const [password, setPassword] = useState('');
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
    if (event.target.name === 'password') {
      setPassword(event.target.value);
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
      });
  }
  useEffect(() => {
    getProfil();
  }, []);

  // fonction pour modifier les informations de profil

  function updateProfil() {
    axios
      .patch(`${baseURL}/user/${id}`, {
        firstname,
        lastname,
        email,
        password,
        birth_date: birthday,
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="4"
          onChange={handleChange}
          value={lastname}
          controlId="validationCustom01"
        >
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            name="lastname"
            defaultValue={data.lastname}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          onChange={handleChange}
          value={firstname}
          controlId="validationCustom02"
        >
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            name="firstname"
            defaultValue={data.firstname}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          onChange={handleChange}
          value={email}
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
          onChange={handleChange}
          value={birthday}
          controlId="validationCustom03"
        >
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="text"
            placeholder="date de naissance"
            name="birthday"
            defaultValue={data.birth_date}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit" onClick={updateProfil}>Modifier mes informations</Button>
    </Form>
  );
}

export default Profil;

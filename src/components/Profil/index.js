/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function Profil() {
  const [validated, setValidated] = useState(false);
  // change c'est la valeur initial
  // handlechange va appeler setchange pour changer la veleur
  // usestate c'est linitialisation du state
  const [change, setChange] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    // console.log('handlesubmit');
  };
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

  // appel API

  const baseURL = 'http://barrealexandre-server.eddi.cloud:8080/api';

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get(`${baseURL}/user`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  function getProfil() {
    axios
      .get(`${baseURL}/user/6`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }
  function modifyProfil() {
    axios
      .patch(`${baseURL}/user/6`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }
  useEffect(() => {
    getProfil();
    modifyProfil();
  }, []);
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
            defaultValue={data.lastname}
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
            defaultValue={data.firstname}
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
              defaultValue={data.email}
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
          <Form.Control
            type="text"
            placeholder="date de naissance"
            defaultValue={data.birth_date}
            required
          />
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

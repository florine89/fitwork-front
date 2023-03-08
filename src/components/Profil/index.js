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
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

import { saveUser } from '../../actions/user';

function Profil() {
  /// Propriété Bootstrap
  // permet d'activer la propriété validated de Bootstrap sur le formulaire
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    // a la soumission du formulaire, évite le rafraichissement de la page par exemple
    event.preventDefault();

    // permet de contrôler le formulaire avec Bootstrap
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // change le state et passe visuellement le formulaire à True (Check ok)
    setValidated(true);
  };

  /// Affichage et modification du formulaire
  // j'importe l'id du user stocké à partir du state de Redux
  const id = useSelector((state) => state.user.id);

  // Déclaration d'un state initial 'vide' pour les différents champs du formulaire
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [data, setData] = useState([]);

  /**
   * Cette fonction permet de récupérer les données du profil en fonction de
   * l'id du user connecté
   * Les données sont alors affichée dans le champ du formulaire en tant que "defaultValue"
   */
  function getProfil() {
    axios
      .get(`http://${process.env.REACT_APP_API_BASE_URL}/user/${id}`)
      .then((response) => {
        // afficher les data au premier rendu
        setData(response.data);
        // console.log(response.data);

        // afficher les data modifiées
        setLastname(response.data.lastname);
        setFirstname(response.data.firstname);
        setEmail(response.data.email);
        setBirthday(dayjs(response.data.birth_date).format('YYYY-MM-DD'));
        // console.log('res data birthdate', response.data.birth_date);
      });
  }

  // Avec le hook de React, j'affiche au premier rendu de ma page les données
  useEffect(() => {
    getProfil();
  }, []);

  /// Fonction pour modifier les informations de profil

  /**
   * Cette fonction permet de vérifier lors de la modification d'un champ
   * - de quel champ il s'agit
   * - compare le nom du champ avec celui attendu
   * - on nourri le state avec la nouvelle valeur
   * @param {*} event , il s'agit de l'evenement sur lequel j'effectue mon Change
   */
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
      // console.log('evt target', event.target.value);
    }
  }

  /**
   * useDispatch permet d'envoyer les modifcations dans le store
   * via l'action saveUser
   * Les données récupérées lors de la modification d'un champ
   * sont enregistrées en BDD
   */
  const dispatch = useDispatch();

  function updateProfil() {
    axios
      .patch(`http://${process.env.REACT_APP_API_BASE_URL}/user/${id}`, {
        firstname,
        lastname,
        email,
        birth_date: birthday,
      })
      .then((response) => {
        dispatch(saveUser(response.data));
        console.log('update user', response.data);
      });
  }

  return (
    <Form className="Profil" noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 Profil-input">
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
            defaultValue={dayjs(data.birth_date).format('YYYY-MM-DD')}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="Profil-button" type="submit" onClick={updateProfil}>Modifier mes informations</Button>
      </Row>
    </Form>
  );
}

export default Profil;

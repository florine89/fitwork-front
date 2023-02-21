import './style.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Field from './Field';

import { login } from '../../actions/user';

// Création du formulaire de connexion avec les props email et password
function LoginForm({
  email,
  password,

}) {
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(login());
    console.log('handleSubmit');
  };

  // Modale (utilisation des states)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

  // Création du form et des champs du formulaire pour la connnexion de l'utilisateur
  // Soumission du form avec un bouton

    <>

      <Button variant="primary" onClick={handleShow}>
        Se connecter
      </Button>

      <div className="login-form">

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Connexion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>

              <Field
                name="email"
                placeholder="Adresse Email"
                value={email}
              />
              <Field
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
              />
              <Button variant="primary" type="submit">
                Envoi
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </div>

    </>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

LoginForm.defaultProps = {
  email: '',
  password: '',
};

export default LoginForm;

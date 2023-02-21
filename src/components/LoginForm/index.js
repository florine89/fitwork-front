import './style.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

  return (

  // Création du form et des champs du formulaire pour la connnexion de l'utilisateur
  // Soumission du form avec un bouton
    <div className="login-form">

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
          Submit
        </Button>
      </Form>
    </div>
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

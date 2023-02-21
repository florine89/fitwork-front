import './style.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

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
  };

  return (

  // Création du form et des champs du formulaire pour la connnexion de l'utilisateur
  // Soumission du form avec un bouton

    <div className="login-form">

      <form
        autoComplete="off"
        className="login-form-element"
        onSubmit={handleSubmit}
      >
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
        <button
          type="submit"
          className="login-form-button"
        >
          OK
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;

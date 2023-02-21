// import { useSelector } from 'react-redux';

/* eslint-disable react/jsx-no-bind */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Style.scss';

// eslint-disable-next-line react/prop-types
export default function Inscription({ change, setChange }) {
  // const value = useSelector((state) => state.value);
  function handleChange(evt) {
    console.log(evt.target.value);
    setChange(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('submit');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formLastName" value={change} onChange={handleChange}>
        <Form.Label>Nom :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez votre nom"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFirstName" value={change} onChange={handleChange}>
        <Form.Label>Prénom :</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre prenom" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail" value={change} onChange={handleChange}>
        <Form.Label>Email :</Form.Label>
        <Form.Control type="email" placeholder="Entrez votre email" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicPassword"
        value={change}
        onChange={handleChange}
      >
        <Form.Label>Mot de passe :</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday" value={change} onChange={handleChange}>
        <Form.Label>Date de naissance :</Form.Label>
        <Form.Control type="date" placeholder="Date de naissance" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formMaleCheckbox"
        value={change}
        onChange={handleChange}
      >
        <Form.Check type="checkbox" label="Masculin" value="Masculin" />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formFemaleCheckbox"
        value={change}
        onChange={handleChange}
      >
        <Form.Check type="checkbox" label="Féminin" value="Feminin" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
      <Button variant="primary" type="reset">
        Annuler
      </Button>
    </Form>
  );
}

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Style.scss';

export default function Inscription() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nom :</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre nom" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Prénom :</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre prenom" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email :</Form.Label>
        <Form.Control type="email" placeholder="Entrez votre email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe :</Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date de naissance :</Form.Label>
        <Form.Control type="date" placeholder="Date de naissance" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Masculin" checked />
        <Form.Check type="checkbox" label="Féminin" />
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

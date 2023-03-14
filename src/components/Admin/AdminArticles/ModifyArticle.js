/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { instance } from '../../../middleware/getAPI';
import { getCategoriesList } from '../../../selectors/categories';

import logo from '../../../assets/inscriptionok.jpg';

export default function ModifyArticle() {
  // On importe les categories du state de Redux
  const categories = useSelector(getCategoriesList);

  // On importe l'id du user connecté à partir du state de Redux
  const userId = useSelector((state) => state.user.id);

  // On initialise les states, à la soumission du formulaire, on les passe à true
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    // a la soumission du formulaire, évite le comportement par défaut
    event.preventDefault();

    // change le state et passe visuellement le formulaire à true (Check ok)
    setValidated(true);
  };

  // Déclaration d'un state initial 'vide' pour les différents champs du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  function handleChange(event) {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
    }
    if (event.target.name === 'description') {
      setDescription(event.target.value);
    }

    if (event.target.name === 'category') {
      setCategory(event.target.value);
    }
  }

  // On récupère dans la requête http l'id de l'article concerné
  const { id } = useParams();

  /**
   * Avec l'instance d'axios, on récupère un article à l'aide de son id
   */
  function getOneArticle() {
    instance
      .get(`/article/${id}`)
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      });
  }

  /**
   * Ici, on modifie un article
   * On récupère l'id dans la requête http et on lui passe les différentes modifications
   * On met à jour les states
   */
  function updateArticle() {
    instance
      .patch(`/article/${id}`, {
        title,
        description,
        category_id: category,
        user_id: userId,
      })
      .then((response) => {
        setTitle(response.data);
        setDescription(response.data);
        setCategory(response.data);
        // console.log('update article', response);
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Au premier rendu de la page, on affiche l'article concerné
   */
  useEffect(() => {
    getOneArticle();
  }, []);

  return (
    <div>
      { !success && (
      <Form className="Profil" noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 Profil-input">

          <Form.Group
            as={Col}
            md="4"
            value={title}
            onChange={handleChange}
            controlId="validationCustom01"
          >
            <Form.Label>titre :</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              name="title"
              defaultValue={title}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            value={description}
            onChange={handleChange}
            controlId="validationCustom02"
          >
            <Form.Label>description :</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              name="description"
              defaultValue={description}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group
            as={Col}
            md="4"
            value={image}
            onChange={handleChange}
            controlId="validationCustomUsername"
          >
            <Form.Label>image</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="file"
                aria-describedby="inputGroupPrepend"
                name="image"
                defaultValue={image}

              />
              <Form.Control.Feedback type="invalid">
                Please choose an image.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group> */}

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlSelect"
          >
            <Form.Label>Thématique</Form.Label>
            <Form.Select
              aria-label="Exemple par défaut"
              name="category"
              onChange={handleChange}
            >
              <option>Choix de la thématique</option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            className="Profil-button"
            type="submit"
            onClick={updateArticle}
          >
            Modifier mes informations
          </Button>
        </Row>
      </Form>
      )}
      { success
      && (
        <div className="Message">
          <img src={logo} className="Message-logo" alt="Logo inscription" />
          <Alert variant="dark">
            <div className="Message-alert">
              <Alert.Heading>Super ! ton articles a été modifié !</Alert.Heading>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}

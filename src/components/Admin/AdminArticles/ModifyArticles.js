/* eslint-disable react/jsx-no-bind */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { saveUser } from '../../../actions/user';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

import { getCategoriesList } from '../../../selectors/categories';
import { getArticlesList } from '../../../selectors/articles';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

export default function ModifyArticles() {
  // const id = useSelector((state) => state.user.id))
  // const categories = useSelector(getCategoriesList);
  // const articles = useSelector(getArticlesList);

  /**
   * useDispatch permet d'envoyer les modifcations dans le store
   * via l'action saveUser
   * Les données récupérées lors de la modification d'un champ
   * sont enregistrées en BDD
   */

  const dispatch = useDispatch();
  /// Affichage et modification du formulaire
  // j'importe l'id du user stocké à partir du state de Redux
  const id = useSelector((state) => state.user.id);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    // a la soumission du formulaire, évite le rafraichissement de la page par exemple
    event.preventDefault();

    // change le state et passe visuellement le formulaire à True (Check ok)
    setValidated(true);
  };

  // Déclaration d'un state initial 'vide' pour les différents champs du formulaire

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);

  function getArticles() {
    axios
      .get(`${API_BASE_URL}/user/${id}/articles`)
      .then((response) => {
        setData(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
        setCategory(response.data.category);
        setArticles(response.data);
      });
  }
  function getOneArticle(articleId) {
    axios
      .get(`${API_BASE_URL}/user/${id}/articles/${articleId}`)
      .then((response) => {
        setData(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
        setCategory(response.data.category);
        setArticles(response.data);
      });
  }

  // Avec le hook de React, j'affiche au premier rendu de ma page les données
  useEffect(() => {
    getArticles();
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
    if (event.target.name === 'title') {
      setTitle(event.target.value);
    }
    if (event.target.name === 'description') {
      setDescription(event.target.value);
    }
    if (event.target.name === 'image') {
      setImage(event.target.value);
    }
    if (event.target.name === 'category') {
      setCategory(event.target.value);
    }
  }

  function updateArticles() {
    axios
      .patch(`${API_BASE_URL}/user/${id}/articles`, {
        title,
        description,
        image,
        category,
      })
      .then((response) => {
        dispatch(saveUser(response.data));
        // console.log('update user', response);
      });
  }

  return (

    <Form className="Profil" noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 Profil-input">
        <Form.Select aria-label="Default select example" onChange={getOneArticle(article.id)}>
          <option>Articles</option>
          {articles.map((article) => (

            <option value={article.title} name={article.title}>{article.title}</option>

          ))};
        </Form.Select>

        <Form.Group
          as={Col}
          md="4"
          value={title}
          onChange={handleChange}
          controlId="validationCustom01"
        >
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            name="title"
            defaultValue={data.title}
          />
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          value={description}
          onChange={handleChange}
          controlId="validationCustom02"
        >
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prénom"
            name="description"
            defaultValue={data.description}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
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
              defaultValue={data.image}
            />
            <Form.Control.Feedback type="invalid">
              Please choose an email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          value={category}
          onChange={handleChange}
          controlId="validationCustom03"
        >
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="date"
            placeholder="date de naissance"
            name="category"
            defaultValue={data.category}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="Profil-button" type="submit" onClick={updateArticles}>Modifier mes informations</Button>
      </Row>
    </Form>
  );
}

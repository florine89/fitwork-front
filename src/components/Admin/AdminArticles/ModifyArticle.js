/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { getCategoriesList } from '../../../selectors/categories';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

export default function ModifyArticle() {
  // j'importe l'id du user stocké à partir du state de Redux
//   const id = useSelector((state) => state.user.id);
  const categories = useSelector(getCategoriesList);
  const userId = useSelector((state) => state.user.id);

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
  const [category, setCategory] = useState('');
  //   const [image, setImage] = useState('');

  function handleChange(event) {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
      console.log('name', event.target.name);
    }
    if (event.target.name === 'description') {
      setDescription(event.target.value);
      console.log('desccription', event.target.value);
    }
    // if (event.target.name === 'image') {
    //   setImage(event.target.value);
    //   setTitle(event.target.value);

    // }
    if (event.target.name === 'category') {
      setCategory(event.target.value);
      console.log('category', event.target.value);
    }
  }
  const { id } = useParams();

  function getOneArticle() {
    axios
      .get(`${API_BASE_URL}/article/${id}`)
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        // setImage(response.data.image);
        setCategory(response.data.category);
      });
  }
  function updateArticle() {
    axios
      .patch(`${API_BASE_URL}/article/${id}`, {
        title,
        description,
        category_id: category,
        user_id: userId,
      })
      .then((response) => {
        setTitle(response.data);
        setDescription(response.data);
        setCategory(response.data);
        console.log('update article', response);
      });
  }

  useEffect(() => {
    getOneArticle();
  }, []);

  return (
    <div>
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
                    // as={NavLink}
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            // key={article.id}
            className="Profil-button"
            type="submit"
            onClick={updateArticle}
          >Modifier mes informations
          </Button>
        </Row>
      </Form>
    </div>
  );
}

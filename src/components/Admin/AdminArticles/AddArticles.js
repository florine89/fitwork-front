/* eslint-disable react/jsx-no-bind */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategoriesList } from '../../../selectors/categories';
import logo from '../../../assets/inscriptionok.jpg';

function AddArticles() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = useSelector(getCategoriesList);
  const id = useSelector((state) => state.user.id);

  const baseURL = 'http://barrealexandre-server.eddi.cloud:8080/api';

  function handleChange(evt) {
    // console.log(evt.target.name);
    if (evt.target.name === 'title') {
      setTitle(evt.target.value);
    }
    if (evt.target.name === 'description') {
      setDescription(evt.target.value);
    }
    if (evt.target.name === 'category') {
      setSelectCategory(evt.target.value);
    }
    // setChange(evt.target.value);
    console.log('changetitle', title);
    console.log('changedescription', description);
    console.log('changeCat', selectCategory);
    // console.log('changeselectCategory', setSelectCategory);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log('submit');
  }

  function createUser() {
    console.log('title', title);
    console.log('description', description);
    // console.log('selectCategory', setSelectCategory);

    axios
      .post(`${baseURL}/article`, {
        title,
        description,
        user_id: id,
        category_id: selectCategory,
      })
      .then((response) => {
        setSuccess(true);
        console.log((response));
        // setPost(response.data);
      });
  }
  return (
    <>
      { !success && (
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={handleChange}
          >
            <Form.Label>Titre :</Form.Label>
            <Form.Control type="text" placeholder="Titre de l'exercice" name="title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword" onChange={handleChange}>
            <Form.Label>description :</Form.Label>
            <Form.Control type="text" placeholder="description de l'exercice" name="description" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Images :</Form.Label>
            <Form.Control type="file" placeholder="Ajout d'une image" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlSelect"
          >
            <Form.Label>Thématique</Form.Label>
            <Form.Select aria-label="Exemple par défaut" name="category" onChange={handleChange}>
              <option>Choix de la thématique</option>
              {categories.map((category) => (
                <option
                    // as={NavLink}
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
              {/* <option value="1">1</option> */}

            </Form.Select>
          </Form.Group>
          {/* <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" name="category" onChange={handleChange}>
              choisissez votre catégorie
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  // as={NavLink}
                  key={category.id}
                  to={`/categorie/${category.id}`}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */}
          <Button variant="primary" type="submit" onClick={createUser}>
            Enregistrer
          </Button>
        </Form>
      )}
      { success
      && (
        <div className="Message">
          <img src={logo} className="Message-logo" alt="Logo inscription" />
          <Alert variant="dark">
            <div className="Message-alert">
              <Alert.Heading>Super ! Votre compte a bien été crée !</Alert.Heading>
              <p>
                Bienvenue dans la Team des Fit Workers !
              </p>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}

export default AddArticles;

// "title": "title article 222",
// "description": "on ajoute un article a la catégorie 2 222",
// "time": null,
// "image": null,
// "type": null,
// "category_id": 2,
// "user_id": 1

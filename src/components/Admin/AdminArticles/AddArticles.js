/* eslint-disable react/jsx-no-bind */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCategoriesList } from '../../../selectors/categories';
import logo from '../../../assets/inscriptionok.jpg';

import './addArticles.scss';

function AddArticles() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [success, setSuccess] = useState(false);
  // const refForm = useRef(null);

  const categories = useSelector(getCategoriesList);
  const id = useSelector((state) => state.user.id);

  // const baseURL = `${process.env.REACT_APP_API_BASE_URL}`;
  /*
 * Cette fonction permet de vérifier lors de la modification d'un champ
 * - de quel champ il s'agit
 * - compare le nom du champ avec celui attendu
 * - on nourri le state avec la nouvelle valeur
 * @param {*} event , il s'agit de l'evenement sur lequel j'effectue mon Change
 */

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
    // video 22:00
    // if (!refForm) {
    //   return;
    // }
    // console.log('submit');
  }

  function createUser() {
    console.log('title', title);
    console.log('description', description);
    // console.log('selectCategory', setSelectCategory);

    axios
      .post(`http://${process.env.REACT_APP_API_BASE_URL}/article`, {
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
    <div className="containers">
      { !success && (
        <Form
          // ref={refForm}
          // mettre le chemin ou sera envoyer l'image(video 20:00)
          // action="/upload"
          className="form"
          method="POST"
          onSubmit={handleSubmit}
        >
          <Form.Group
            className="mb-3 form-title"
            controlId="formBasicEmail"
            onChange={handleChange}
          >
            <Form.Label className="form_label">Titre </Form.Label>
            <Form.Control type="text" placeholder="Titre de l'exercice" name="title" className="form_input" />
          </Form.Group>

          <Form.Group className="mb-3 form-description" controlId="formBasicPassword" onChange={handleChange}>
            <Form.Label className="form_label">description </Form.Label>
            <Form.Control type="text" placeholder="description de l'exercice" name="description" className="form_input" />
          </Form.Group>

          <Form.Group className="mb-3 form-img" controlId="formBasicPassword">
            <Form.Label className="form_label">Images </Form.Label>
            <Form.Control type="file" placeholder="Ajout d'une image" className="form_input" />
          </Form.Group>
          <Form.Group
            className="mb-3 form-thématique"
            controlId="exampleForm.ControlSelect"
          >
            <Form.Label className="form_label">Thématique</Form.Label>
            <Form.Select aria-label="Exemple par défaut" name="category" onChange={handleChange} className="form_input">
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
          <Button variant="primary" type="submit" onClick={createUser} className="form-btn">
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
              <Alert.Heading>Super ! ton articles a été ajouté !</Alert.Heading>
            </div>
          </Alert>
        </div>
      )}
    </div>
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

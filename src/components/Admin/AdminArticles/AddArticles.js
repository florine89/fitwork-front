/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { instance } from '../../../middleware/getAPI';
import { getCategoriesList } from '../../../selectors/categories';

import logo from '../../../assets/inscriptionok.jpg';

import './addArticles.scss';

function AddArticles({ articles, setArticles }) {
  // On intialise les state pour les différents champs du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectCategory, setSelectCategory] = useState('');

  // Le state passera à true pour afficher le message à la soumission du formulaire
  const [success, setSuccess] = useState(false);

  // On importe les categories du state de Redux
  const categories = useSelector(getCategoriesList);

  // On importe l'id du user connecté dans le state de Redux
  const id = useSelector((state) => state.user.id);

  /**
 * Cette fonction permet de vérifier lors de la modification d'un champ
 * de quel champ il s'agit
 * compare le nom du champ avec celui attendu
 * on nourri le state avec la nouvelle valeur
 * @param {*} evt il s'agit de l'evenement sur lequel j'effectue mon Change
 */
  function handleChange(evt) {
    if (evt.target.name === 'title') {
      setTitle(evt.target.value);
    }
    if (evt.target.name === 'description') {
      setDescription(evt.target.value);
    }
    if (evt.target.name === 'category') {
      setSelectCategory(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  /**
   * Requête post pour la création d'un article
   * On passe via l'instance d'axios en POST
   * On récupère dans le body les informations nécessaire à la création d'un article
   * A la soumission du formulaire, on change le state de success pour afficher le message de succès
   */
  function createArticle() {
    instance
      .post('/article', {
        title,
        description,
        user_id: id,
        category_id: selectCategory,
      })
      .then((response) => {
        setSuccess(true)
          .catch((error) => {
            console.error(error);
          });

        // ...articles deverse les informations marquées dans les inputs
        // (state => récupère de son parent la liste (index.js))
        // response.data correspond à l'article que l'on vient d'enregistrer en bdd
        // On irrigue le state avec le nouvel article pour mettre à jour le state
        const newArticles = [...articles, response.data];
        setArticles(newArticles);
      });
  }
  return (
    <div className="containers">
      { !success && (
        <Form
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
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}

            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={createArticle} className="form-btn">
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

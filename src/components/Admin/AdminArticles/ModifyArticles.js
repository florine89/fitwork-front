/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-bind */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';

// import { saveUser } from '../../../actions/user';
// import ModifyArticle from './ModifyArticle';

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// import { getCategoriesList } from '../../../selectors/categories';
// import { getArticlesList } from '../../../selectors/articles';

// const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

export default function ModifyArticles() {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [category, setCategory] = useState('');
  const [articles, setArticles] = useState([]);

  const id = useSelector((state) => state.user.id);
  // const categories = useSelector(getCategoriesList);
  // const articles = useSelector(getArticlesList);

  // /**
  //  * useDispatch permet d'envoyer les modifcations dans le store
  //  * via l'action saveUser
  //  * Les données récupérées lors de la modification d'un champ
  //  * sont enregistrées en BDD
  //  */

  // const dispatch = useDispatch();

  /// Affichage et modification du formulaire
  // j'importe l'id du user stocké à partir du state de Redux
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   // a la soumission du formulaire, évite le rafraichissement de la page par exemple
  //   event.preventDefault();

  //   // change le state et passe visuellement le formulaire à True (Check ok)
  //   setValidated(true);
  // };

  // const [data, setData] = useState([]);

  function getArticles() {
    axios
      .get(`http://${process.env.REACT_APP_API_BASE_URL}/user/${id}/articles`)
      .then((response) => {
        setArticles(response.data);
      });
  }

  /// Fonction pour modifier les informations de profil

  function removeArticle(idArticle) {
    console.log('removeArticle');
    console.log(idArticle);
    //! Delete de l'article (requete axios) en fonction de "article_id"

    axios
      .delete(`http://${process.env.REACT_APP_API_BASE_URL}/article/${idArticle}`, {
        user_id: id,
      })
      .then((response) => {
        console.log(response.data);

        const newArticles = articles.filter((article) => article.id !== idArticle);
        setArticles(newArticles);
      });
  }
  // Avec le hook de React, j'affiche au premier rendu de ma page les données
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <div>Titre : {article.title}</div>
          <div>Description : {article.description}</div>
          <Button
          // onClick={() => modifyArticle(article.id)}
            as={NavLink}
            to={`article/${article.id}`}
          >
            Modifier
          </Button>
          <Button
            type="submit"
            onClick={() => removeArticle(article.id)}
          >
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  );
}

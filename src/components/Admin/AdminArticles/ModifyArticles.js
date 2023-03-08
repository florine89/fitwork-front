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

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

export default function ModifyArticles() {
  // const id = useSelector((state) => state.user.id))
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
  const id = useSelector((state) => state.user.id);
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   // a la soumission du formulaire, évite le rafraichissement de la page par exemple
  //   event.preventDefault();

  //   // change le state et passe visuellement le formulaire à True (Check ok)
  //   setValidated(true);
  // };

  // const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);

  function getArticles() {
    axios
      .get(`${API_BASE_URL}/user/${id}/articles`)
      .then((response) => {
        setArticles(response.data);
      });
  }

  // Avec le hook de React, j'affiche au premier rendu de ma page les données
  useEffect(() => {
    getArticles();
  }, []);

  /// Fonction pour modifier les informations de profil

  function removeArticle(article_id) {
    console.log('removeArticle');
    //! Delete de l'article (requete axios) en fonction de "article_id"
    function updateArticle() {
    //   axios
    //     .patch(`${API_BASE_URL}/article/${id}`, {
    //       title,
    //       description,
    //       category_id: category,
    //       user_id: userId,
    //     })
    //     .then((response) => {
    //       setTitle(response.data);
    //       setDescription(response.data);
    //       setCategory(response.data);
    //       console.log('update article', response);
    //     });
    // }
  }

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
            onClick={() => removeArticle(article.id)}
          >
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  );
}

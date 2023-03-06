/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './style.scss';
import logo from '../../assets/femmebureau.jpg';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

function Favorite() {
  // j'initialise le state avec un tableau vide poru récupérer mes articles
  const [articles, setArticles] = useState([]);

  // j'utilise l'id de l'utilisateur connecté stocké dans le state de Redux
  const id = useSelector((state) => state.user.id);

  /**
   * J'appelle avec axios mon API pour récupérer les articles du programme
   * de l'utilisateur connecté
   */
  function getFavoriteForOneUser() {
    axios.get(`${API_BASE_URL}/user/${id}/favorite`).then((response) => {
      setArticles(response.data);
    });
  }

  // j'utilise le hook de React pour rendre la fonction au premier rendu
  // "id" est stocké dans le tableau de dépendances.
  // a chaque mise à jour de l'id, le useEffect s'éxécute
  useEffect(() => {
    getFavoriteForOneUser();
  }, [id]);

  // TODO ajouter un article au programme

  const userId = useSelector((state) => state.user.id); // je recupère mon user id avec redux

  /**
   * A la soumission du formulaire, évite le comportement par défaut
   * de rechargement de la page par exemple
  */
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  /**
 * La fonction permet d'ajouter un article au programme sur le onClick.
 * @param {*} idArticle Sur le onClick, on lui passe l'arguemnt article_id.
 * La fonction anonyme évite que la fonction ne s'exécute seule au rendu.
 */
  function addArticleToProgram(idArticle) {
    axios
      .post(`${API_BASE_URL}/article/${idArticle}/program`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        console.log((response.data));
      });
  }

  // Delete un article des favoris
  // TODO passer un paramètre dans les dépendances afin d'afficher les articles modifiés

  /**
   * Cette fonction permet de supprimer un article des favoris du user
   * @param {*} idArticle ici, idArticle correspond à article_id
   */
  function deleteOneArticleFromFavorite(idArticle) {
    axios
      .delete(`${API_BASE_URL}/article/${idArticle}/favorite`, {
        user_id: userId,
      })
      .then((response) => {
        console.log((response.data));
      });
  }

  return (

    <div className="Articles">
      <h1 className="Articles-title">Mes favoris</h1>
      <Form className="Articles-form" onSubmit={handleSubmit}>
        {articles.map((article) => (
          <article key={article.id} className="Articles-card">
            <Card style={{ width: '18rem', height: '25rem' }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="Articles-card-description">
                  {article.description}
                </Card.Text>
                <div className="Articles-card-buttons">

                  <ButtonGroup size="sm">
                    <Button
                      className="Articles-card-buttons-one"
                      variant="primary"
                      type="submit"
                      onClick={() => addArticleToProgram(article.article_id)}
                    >
                      Ajouter au programme
                    </Button>
                    <Button
                      className="Articles-card-buttons-one"
                      variant="info"
                      type="submit"
                      onClick={() => deleteOneArticleFromFavorite(article.article_id)}
                    >
                      Retirer des fav
                    </Button>
                  </ButtonGroup>

                </div>
              </Card.Body>
            </Card>
          </article>
        ))}
      </Form>
    </div>
  );
}

export default Favorite;
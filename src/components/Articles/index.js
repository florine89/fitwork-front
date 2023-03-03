/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import logo from '../../assets/femmebureau.jpg';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

function Articles() {
  // récupérer tous les articles de la catégorie

  const [articles, setArticles] = useState([]); // je récupère les articles dans le state local

  const { id } = useParams(); // je recupère l'id de la catégorie dans la requete http

  /**
   * Cette fonction recupère la liste des articles de la catégorie concernée
  */
  function getArticleByCategorie() {
    axios.get(`${API_BASE_URL}/category/${id}`).then((response) => {
      setArticles(response.data); // j'importe mes data dans le state local
    });
  }

  /**
   * A chaque changement d'id, useEffect rappelle la fonction concernée et met à jour l'affichage
   */
  useEffect(() => {
    getArticleByCategorie();
  }, [id]);

  // ajouter un article au programme

  const userId = useSelector((state) => state.user.id); // je recupère mon user id avec redux

  /**
   * A la soumission du formulaire, évite le comportement par défaut
   * de rechargement de la page par exemple
  */
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  /**
 * La fonction permet d'ajouter un article aux favoris sur le onClick.
 * @param {*} idArticle Sur le onClick, on lui passe l'arguemnt article.id.
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

  // ajouter un article aux favoris

  /**
   * La fonction permet d'ajouter un article aux favoris sur le onClick.
   * @param {*} idArticle Sur le onClick, on lui passe l'arguemnt article.id.
   * La fonction anonyme évite que la fonction ne s'exécute seule au rendu.
   */
  function addArticleToFavorites(idArticle) {
    axios
      .post(`${API_BASE_URL}/article/${idArticle}/favorite`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        console.log((response.data));
      });
  }

  return (
    <div className="Articles">
      <h1>Articles disponibles pour la categorie</h1>
      <Form onSubmit={handleSubmit}>
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
                  <Button
                    className="Articles-card-buttons-one"
                    variant="primary"
                    type="submit"
                    onClick={() => addArticleToProgram(article.id)}
                  >
                    Programme
                  </Button>
                  <Button
                    className="Articles-card-buttons-one"
                    variant="secondary"
                    type="submit"
                    onClick={() => addArticleToFavorites(article.id)}
                  >
                    Favoris
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </article>
        ))}
      </Form>
    </div>
  );
}

export default Articles;

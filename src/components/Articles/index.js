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

// import { getArticlesList } from '../../selectors/articles';

function Articles() {
  const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

  const [articles, setArticles] = useState([]); // je récupère les articles dans le state local
  const userId = useSelector((state) => state.user.id); // je recupère mon user id avec redux

  const { id } = useParams(); // je recupère l'id de la catégorie dans la requete http

  const idArticle = 1; // TODO a dynamiser
  console.log(idArticle);

  /**
   * Cette fonction recupère la liste des articles de la catégorie concernée
   */
  function getArticleByCategorie() {
    axios.get(`${API_BASE_URL}/category/${id}`).then((response) => {
      setArticles(response.data);
    });
  }

  /**
   * A la soumission du formulaire, évite le comportement par défaut
   */
  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log('submit');
  }

  /**
   * Cette fonction ajoute au click un article au programme du user connecté
   */
  function addArticleToProgram() {
    // console.log('userId', userId);

    axios
      .post(`${API_BASE_URL}/article/${idArticle}/program`, {
        user_id: userId,
      })
      .then((response) => {
        console.log((response.data));
      });
  }

  /**
   * A chaque changement d'id, useEffect rappelle la fonction concernée et met à jour l'affichage
   */
  useEffect(() => {
    getArticleByCategorie();
  }, [id]);

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
                <Button className="Articles-card-button" variant="primary" type="submit" onClick={addArticleToProgram}>Ajouter au programme</Button>
              </Card.Body>
            </Card>
          </article>
        ))}
      </Form>
    </div>
  );
}

export default Articles;

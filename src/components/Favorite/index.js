import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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

  return (
  /*     <div className="program">
      <h1 className="program-title">Mes Favoris :</h1>
      {articles.map((article) => (
        <Form key={article.id}>
          {['checkbox'].map((type) => (
            <div className="mb-3" key={article.id}>
              <Form.Check
                key={article.id}
                type={type}
                id={`default-${type}`}
                label={article.title}
              />
            </div>
          ))}
        </Form>
      ))}
    </div> */

    <div className="Articles">
      <h1>Mes favoris</h1>
      <Form className="Articles-form">
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
                  >
                    Ajouter au programme
                  </Button>
                  <Button
                    className="Articles-card-buttons-one"
                    variant="info"
                    type="submit"
                  >
                    Retirer des fav
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

export default Favorite;

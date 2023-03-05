import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import './style.scss';

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
    <div className="program">
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
    </div>
  );
}

export default Favorite;

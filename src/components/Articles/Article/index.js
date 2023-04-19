/* eslint-disable no-nested-ternary */
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { instance } from '../../../middleware/getAPI';

import './style.scss';

function Article() {
  // Loader
  const [isLoading, toggleIsLoading] = useState(false);

  // Initialisation du state avec un tableau vide
  const [article, setArticle] = useState([]);

  const { id } = useParams();

  /**
   * On récupère un article avec l'id de la requête http
   * On passe le toggle à true pendant le chargement
   */
  function getOneArticle() {
    toggleIsLoading(true);
    instance.get(`/article/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        toggleIsLoading(false);
      });
  }

  useEffect(() => {
    getOneArticle();
  }, [id]);

  const userId = useSelector((state) => state.user.id); // je recupère mon user id avec redux

  function addArticleToFavorites(idArticle) {
    instance
      .post(`/article/${idArticle}/favorite`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        console.log((response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addArticleToProgram(idArticle) {
    instance
      .post(`/article/${idArticle}/program`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        console.log((response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="Article">

      {isLoading
        && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

      {!isLoading && (

        <Card className="Article-center">
          <Card.Header className="Article-type" as="h5">Type: {!article.type ? 'pas de type renseigné' : article.type}</Card.Header>
          <Card.Body>
            <Card.Title className="Article-title">{article.title}</Card.Title>
            <Card.Img src={`${process.env.REACT_APP_BASE_URL}/article/${article.id}/image`} className="Article-image" />
            <Card.Text className="Article-description">
              {article.description}
            </Card.Text>
            <Card.Text className="Article-description">
              Durée de l'activité : {!article.time ? 'à ta convenance !' : (!article.time.minutes ? `${article.time.seconds} seconde(s)` : `${article.time.minutes} minutes(s)`) }
            </Card.Text>
            <ButtonGroup className="Article-button" aria-label="Ajouter l'article">
              <Button
                variant="light"
                type="submit"
                onClick={() => addArticleToFavorites(article.id)}
              >
                Ajouter aux favoris
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => addArticleToProgram(article.id)}
              >
                Ajouter au programme
              </Button>
            </ButtonGroup>

          </Card.Body>
        </Card>
      )}

    </div>
  );
}

export default Article;

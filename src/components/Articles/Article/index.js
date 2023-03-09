import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

function Article() {
  // Loader
  const [isLoading, toggleIsLoading] = useState(false);
  const [article, setArticle] = useState([]);

  // const [image, setImage] = useState('');

  const { id } = useParams();

  function getOneArticle() {
    toggleIsLoading(true);
    axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/article/${id}`)
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
    axios
      .post(`http://${process.env.REACT_APP_API_BASE_URL}/article/${idArticle}/favorite`, {
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
    axios
      .post(`http://${process.env.REACT_APP_API_BASE_URL}/article/${idArticle}/program`, {
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

        <Card className="text-center">
          <Card.Header as="h5">Type: {!article.type ? 'pas de type renseigné' : article.type}</Card.Header>
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Img src={`http://${process.env.REACT_APP_API_BASE_URL}/article/${article.id}/image`} className="Article-image" />
            <Card.Text className="Article-card">
              {article.description}
            </Card.Text>
            <ButtonGroup aria-label="Ajouter l'article">
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

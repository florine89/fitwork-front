import './style.scss';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { instance } from '../../../middleware/getAPI';

function ArticleContainer() {
  // Initialisation du state local avec un tableau vide
  const [articles, setArticles] = useState([]);

  // on récupère l'id du user de la requête
  const { id } = useParams();

  /**
  * Permet de récupérer tous les articles
  */
  function getAllArticles() {
    instance.get('/articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Au premier rendu de la page, on exécute la fonction
   * A chaque modification de l'id, le composant est mis à jour
   */
  useEffect(() => {
    getAllArticles();
  }, [id]);

  // Dans le composant, on fait un .slice.map pour afficher les 3 premiers articles
  // puis on dynamise avec article.title et article.description

  return (

    <article className="card-article">
      <p className="card-article-title">Comment ça fonctionne? Ci dessous un échantillon des articles disponibles !</p>
      <Carousel className="card-article-carousel" variant="dark" slide={false}>
        {articles.slice(0, 4).map((article) => (
          <Carousel.Item className="card-article-inner" key={article.id}>
            <Card style={{ width: '18rem', height: '25rem' }}>
              <Card.Img className="card-img" variant="light" src={`${process.env.REACT_APP_BASE_URL}/article/${article.id}/image`} />
              <Card.Body>
                <Card.Title className="article-title">{article.title}</Card.Title>
                <Card.Text className="card-description">
                  {article.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </article>
  );
}
export default ArticleContainer;

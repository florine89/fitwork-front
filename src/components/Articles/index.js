import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import logo from '../../assets/femmebureau.jpg';

// import { useSelector } from 'react-redux';

// import { getArticlesList } from '../../selectors/articles';

function Articles() {
  const [articles, setArticles] = useState([]);

  const { id } = useParams();
  console.log('id de la catégorie', id);

  useEffect(() => {
    const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

    axios.get(`${API_BASE_URL}/category/${id}`).then((response) => {
      setArticles(response.data);
    });
  }, [id]);
  // const articles = useSelector(getArticlesList);
  // console.log('articles', articles);

  /*   const articlee = useSelector((state) => findArticle(state.articles.list, id));
  console.log('articlee', articlee); */

  return (
    <div className="Articles">
      <h1>Articles disponibles pour la categorie</h1>
      <div className="card-container">

        {articles?.length && articles.map((article) => (
          <article key={article.id} className="card-article">
            <Card style={{ width: '18rem', height: '25rem' }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="card-description">
                  {article.description}
                </Card.Text>
                <Button className="card-button" variant="primary">Ajouter au programme</Button>
              </Card.Body>
            </Card>
          </article>
        ))}

      </div>

    </div>
  );
}

export default Articles;

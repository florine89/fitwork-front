import './style.scss';

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import logo from '../../../assets/femmebureau.jpg';
//
function ArticleContainer() {
  const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';
  const [articles, setArticles] = useState([]);

  const { id } = useParams();

  function getOneArticle() {
    axios.get(`${API_BASE_URL}/articles`)
      .then((response) => {
        setArticles(response.data);
      });
  }

  useEffect(() => {
    getOneArticle();
  }, [id]);

  const userId = useSelector((state) => state.user.id);

  // on fait un .slice.map pour afficher les 3 premiers articles
  // puis on dynamise avec article.title et article.description
  return (

    <article className="card-article">

      <Carousel variant="dark" slide={false}>
        {articles.slice(0, 3).map((article) => (
          <Carousel.Item key={article.id}>

            <Card style={{ width: '18rem', height: '25rem' }}>
              <Card.Img className="card-img" variant="light" src={`http://${process.env.REACT_APP_API_BASE_URL}/article/${article.id}/image`} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
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

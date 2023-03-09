import './style.scss';

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

    <div className="card-container">

      <article className="card-article">
        {articles.slice(0, 3).map((article) => (
          <Card key={article.id} style={{ width: '18rem' }}>
            <Card.Img variant="light" src={`http://${process.env.REACT_APP_API_BASE_URL}/article/${article.id}/image`} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>
                {article.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </article>

      {/* <article className="card-article">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="light" src={logo} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="light">Go somewhere</Button>
          </Card.Body>
        </Card>
      </article>
      <article className="card-article">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={logo} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="light">Go somewhere</Button>
          </Card.Body>
        </Card>
      </article> */}
    </div>
  );
}
export default ArticleContainer;

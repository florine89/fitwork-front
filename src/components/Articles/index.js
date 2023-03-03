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

  const [articles, setArticles] = useState([]);

  const { id } = useParams();
  console.log('id de la catégorie', id);

  const userId = useSelector((state) => state.user.id);

  function getArticleByCategorie() {
    axios.get(`${API_BASE_URL}/category/${id}`).then((response) => {
      setArticles(response.data);
    });
  }

  const idArticle = 1;
  console.log(idArticle);

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log('submit');
  }

  function addArticleToProgram() {
    console.log('click');
    console.log('userId', userId);

    axios
      .post(`${API_BASE_URL}/article/${idArticle}/program`, { // id article
        user_id: userId,
      })
      .then((response) => {
        console.log((response.data));
      });
  }

  useEffect(() => {
    getArticleByCategorie();
  }, [id]);

  return (
    <div className="Articles">
      <h1>Articles disponibles pour la categorie</h1>
      <Form onSubmit={handleSubmit}>
        {articles.map((article) => (
          <article key={article.id} className="card-article">
            <Card style={{ width: '18rem', height: '25rem' }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="card-description">
                  {article.description}
                </Card.Text>
                <Button className="card-button" variant="primary" type="submit" onClick={addArticleToProgram}>Ajouter au programme</Button>
              </Card.Body>
            </Card>
          </article>
        ))}
      </Form>
    </div>
  );
}

export default Articles;

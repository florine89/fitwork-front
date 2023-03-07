import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import logo from '../../../assets/femmebureau.jpg';

function Article() {
  const [article, setArticle] = useState([]);

  const { id } = useParams();

  function getOneArticle() {
    axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/article/${id}`).then((response) => {
      setArticle(response.data);
    });
  }

  useEffect(() => {
    getOneArticle();
  }, [id]);

  return (
    <div className="Article">

      <Card className="text-center">
        <Card.Header as="h5">Type: {!article.type ? 'pas de type renseigné' : article.type}</Card.Header>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Img src={logo} className="Article-image" />
          <Card.Text className="Article-card">
            {article.description}
          </Card.Text>
          <ButtonGroup aria-label="Ajouter l'article">
            <Button variant="light">Ajouter aux favoris</Button>
            <Button variant="primary">Ajouter au programme</Button>
          </ButtonGroup>

        </Card.Body>
      </Card>

    </div>
  );
}

export default Article;

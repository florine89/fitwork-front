import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';

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
      <ListGroup variant="flush">
        <ListGroup.Item>Titre: {article.title}</ListGroup.Item>
        <ListGroup.Item>Description: {article.description}</ListGroup.Item>

        <ListGroup.Item>
          Type: {!article.type ? 'pas de type renseigné' : article.type}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Article;

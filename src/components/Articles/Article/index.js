import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

function Article() {
  const [article, setArticle] = useState([]);

  const { id } = useParams();

  function getOneArticle() {
    axios.get(`${API_BASE_URL}/article/${id}`).then((response) => {
      setArticle(response.data);
    });
  }

  useEffect(() => {
    getOneArticle();
  }, [id]);

  return (
    <div className="Article">
      <ListGroup variant="flush">
        <ListGroup.Item>{article.title}</ListGroup.Item>
        <ListGroup.Item>{article.description}</ListGroup.Item>

        {/*         <ListGroup.Item>{article.time}</ListGroup.Item>
        <ListGroup.Item>{article.type}</ListGroup.Item> */}
      </ListGroup>
    </div>
  );
}

export default Article;

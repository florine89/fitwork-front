import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Icon from '../ui/Icon';
import './style.scss';

import Counter from './Counter';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

function Program() {
  const [articles, setArticles] = useState([]);

  const id = useSelector((state) => state.user.id);
  // console.log('id du user', id);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/user/${id}/program`).then((response) => {
      setArticles(response.data);
    });
  }, [id]);

  // TODO coder la route delete
  // TODO counter ?
  const number = 1;

  return (
    <div className="program">
      <h1 className="program-title">Mon Programme</h1>
      <Counter number={number} />
      {articles.map((article) => (
        <ListGroup key={article.id}>
          {['checkbox'].map((type) => (
            <div className="mb-3 program-input" key={article.id}>
              <ListGroup.Item className="program-input-article">
                <Button
                  type="submit"
                  variant="info"
                  className="program-input-bin"
                >
                  <Icon icon="bin" size="1rem" />
                </Button>
                <Form.Check
                  key={article.id}
                  type={type}
                  id={`default-${type}`}
                  label={article.title}
                />

              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      ))}
    </div>
  );
}

export default Program;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Icon from '../ui/Icon';
import './style.scss';

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

  return (
    <div className="program">
      <h1 className="program-title">Mon Programme :</h1>

      {articles.map((article) => (
        <Form key={article.id}>
          {['checkbox'].map((type) => (
            <div className="mb-3 program-input" key={article.id}>
              <Form.Check
                className="program-input-article"
                key={article.id}
                type={type}
                id={`default-${type}`}
                label={article.title}
              />
              <Button
                type="submit"
                variant="info"
                className="program-input-bin"
              >
                <Icon icon="bin" size="1rem" />
              </Button>

            </div>
          ))}
        </Form>
      ))}
    </div>
  );
}

export default Program;

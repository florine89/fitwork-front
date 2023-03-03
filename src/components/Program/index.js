import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import './style.scss';

function Program() {
  const [articles, setArticles] = useState([]);

  const id = useSelector((state) => state.user.id);
  console.log('id du user', id);

  useEffect(() => {
    const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

    axios.get(`${API_BASE_URL}/user/${id}/program`).then((response) => {
      setArticles(response.data);
    });
  }, [id]);

  return (
    <div className="program">
      <h1 className="program-title">Mon Programme :</h1>
      {articles.map((article) => (
        <Form>
          {['checkbox'].map((type) => (
            <div className="mb-3">
              <Form.Check
                key={article.id}
                type={type}
                id={`default-${type}`}
                label={article.title}
              />
            </div>
          ))}
        </Form>
      ))}
    </div>
  );
}

export default Program;

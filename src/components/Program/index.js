/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Icon from '../ui/Icon';
import './style.scss';

import Counter from './Counter';

function Program() {
  const [articles, setArticles] = useState([]);

  const id = useSelector((state) => state.user.id);
  // console.log('id du user', id);

  function deleteArticleProgram(idProgram) {
    console.log('delete');
    axios.delete(`http://${process.env.REACT_APP_API_BASE_URL}/program/${idProgram}`, {
      user_id: id,
    })
      .then((response) => {
        console.log(response.data);
        const newArticles = articles.filter((article) => article.program_id !== idProgram);
        setArticles(newArticles);
      });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/user/${id}/program`).then((response) => {
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
      <Form onSubmit={handleSubmit}>
        {articles.map((article) => (
          <ListGroup key={article.program_id}>
            {['checkbox'].map((type) => (
              <div className="mb-3 program-input" key={article.program_id}>
                <ListGroup.Item className="program-input-article">
                  <Button
                    type="submit"
                    variant="info"
                    className="program-input-bin"
                    onClick={() => deleteArticleProgram(article.program_id)}
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
      </Form>
    </div>
  );
}

export default Program;

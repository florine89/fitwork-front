/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';

import Icon from '../ui/Icon';
import './style.scss';

import { instance } from '../../middleware/getAPI';

import Counter from './Counter';

function Program() {
  // toast
  const [showA, setShowA] = useState(false);
  const [articles, setArticles] = useState([]);

  const id = useSelector((state) => state.user.id);
  console.log('id du user', id);

  function toggleStatus(article) {
    // faire appel à la bdd pour modifier le statut
    instance
      .patch(`/program/${article.program_id}`, {
        user_id: id,
      })
      .then((response) => {
        const updatedArticles = articles.map((art) => {
          if (art.program_id === article.program_id) art.status = !art.status;
          return (art);
        });
        setArticles(updatedArticles);
      });
  }

  const toggleShowToast = () => {
    setShowA(!showA);
    articles.map((article) => toggleStatus(article));
  };

  function deleteArticleProgram(idProgram) {
    console.log('delete');
    instance.delete(`/program/${idProgram}`)
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
    if (id) {
      instance.get(`/user/${id}/program`).then((response) => {
        setArticles(response.data);
      });
    }
  }, [id]);

  // cette const recupère le tableau des articles et filtre le nombre d'article
  const undoneArticles = articles.filter((article) => article.status === false);
  console.log('hello', undoneArticles);
  // const changeStatus = articles.filter(({ article }) => !article);

  // on récupère les tâches effectuéesicle
  // const doneArticles = articles.filter(({ done }) => done);
  console.log(articles);

  return (
    <div className="program">
      <h1 className="program-title">Mon Programme</h1>
      <Counter number={articles.filter((article) => article.status === false).length} />
      <Form onSubmit={handleSubmit}>
        {articles.map((article) => (
          <ListGroup key={article.program_id}>
            <div className="mb-3 program-input" key={article.program_id}>
              <ListGroup.Item className="program-input-article">
                <Button
                  type="submit"
                  variant="light"
                  className="program-input-bin"
                  onClick={() => deleteArticleProgram(article.program_id)}
                >
                  <Icon icon="bin" size="1rem" />
                </Button>
                <Button
                  type="submit"
                  variant="light"
                  className="program-input-bin"
                  as={NavLink}
                  to={`/article/${article.article_id}`}
                >
                  <Icon icon="search" size="1rem" />
                </Button>
                <Form.Check
                  key={article.id}
                  label={article.title}
                  onChange={() => toggleStatus(article)}
                  checked={article.status}
                  // defaultChecked={article.status}
                />
              </ListGroup.Item>
            </div>
          </ListGroup>
        ))}
        <Button
          className="btn-default"
          type="submit"
          onClick={toggleShowToast}
        >J'ai terminé
        </Button>
      </Form>
      <Toast show={showA} onClose={() => setShowA(!showA)} className="message-toast">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bravo !</strong>
        </Toast.Header>
        <Toast.Body>Tu as atteint tes objectifs journaliers</Toast.Body>
      </Toast>
    </div>
  );
}

export default Program;

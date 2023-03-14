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
  const [showToast, setShowToast] = useState(false);

  const [articles, setArticles] = useState([]);

  const id = useSelector((state) => state.user.id);

  /**
   * Cette fonction permet de changer le statuts de l'article en "done" (true)
   * @param {*} article il s'agit de l'article sur lequel l'utilisateur clique
   */
  function toggleStatus(article) {
    // faire appel à la bdd pour modifier le statut de chaque article
    instance
      .patch(`/program/${article.program_id}`, {
        user_id: id,
      })
      .then((response) => {
        const updatedArticles = articles.map((art) => {
          if (art.program_id === article.program_id) art.status = !art.status;
          return (art);
        });
        // mis à jour du state avec les articles modifiés
        setArticles(updatedArticles);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * On affiche le toast au click de l'utilisateur et on exécute
   * la fonction toggleStatus pour réinitialiser le programme
   */
  const toggleShowToast = () => {
    setShowToast(!showToast);
    articles.map((article) => toggleStatus(article));
  };

  function deleteArticleProgram(idProgram) {
    instance.delete(`/program/${idProgram}`)
      .then((response) => {
        // console.log(response.data);
        // Afin d'obtenir un miroir de notre BDD sur le navigateur, on filtre le tableau article
        // on récupère les articles pour lesquels l'id est différent pour mettre à jour le state
        const newArticles = articles.filter((article) => article.program_id !== idProgram);
        setArticles(newArticles);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  /**
   * Dans le useEffect, le if (id) permet d'exécuter la requête uniquement si un id existe,
   * soit uniquement si le user est connecté
   */
  useEffect(() => {
    if (id) {
      instance.get(`/user/${id}/program`)
        .then((response) => {
          setArticles(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

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
      <Toast show={showToast} onClose={() => setShowToast(!showToast)} className="message-toast">
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

/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';

import { instance } from '../../middleware/getAPI';

import Icon from '../ui/Icon';
import './style.scss';

function Favorite() {
  // j'initialise le state avec un tableau vide poru récupérer mes articles
  const [articles, setArticles] = useState([]);

  // j'utilise l'id de l'utilisateur connecté stocké dans le state de Redux
  const id = useSelector((state) => state.user.id);

  /**
   * J'appelle avec axios mon API pour récupérer les articles du programme
   * de l'utilisateur connecté
   */
  function getFavoriteForOneUser() {
    instance.get(`/user/${id}/favorite`).then((response) => {
      setArticles(response.data);
    });
  }

  // j'utilise le hook de React pour rendre la fonction au premier rendu
  // "id" est stocké dans le tableau de dépendances.
  // a chaque mise à jour de l'id, le useEffect s'éxécute
  useEffect(() => {
    getFavoriteForOneUser();
  }, [id]);

  const userId = useSelector((state) => state.user.id); // je recupère mon user id avec redux

  /**
   * A la soumission du formulaire, évite le comportement par défaut
   * de rechargement de la page par exemple
  */
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  /**
 * La fonction permet d'ajouter un article au programme sur le onClick.
 * @param {*} idArticle Sur le onClick, on lui passe l'arguemnt article_id.
 * La fonction anonyme évite que la fonction ne s'exécute seule au rendu.
 */
  function addArticleToProgram(idArticle) {
    instance
      .post(`/article/${idArticle}/program`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        setShow(true);
        console.log((response.data));
      });
  }

  // Delete un article des favoris

  /**
   * Cette fonction permet de supprimer un article des favoris du user
   * @param {*} idArticle ici, idArticle correspond à article_id
   */
  function deleteOneArticleFromFavorite(idArticle) {
    instance
      .delete(`/article/${idArticle}/favorite`)
      .then((response) => {
        console.log((response.data));
        const newArticles = articles.filter((article) => article.article_id !== idArticle);
        setArticles(newArticles);
      });
  }

  return (

    <div className="Articles">
      <h1 className="Articles-title">Mes favoris</h1>

      <Modal show={show} onHide={handleClose} variant="secondary">
        <Modal.Header closeButton>
          <Modal.Title>C'EST OK</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ton article a bien été ajouté à ton programme!</Modal.Body>
      </Modal>

      <Form className="Articles-form" onSubmit={handleSubmit}>
        {articles.map((article) => (
          <article key={article.article_id} className="Articles-card">
            <Card style={{ width: '18rem', height: '25rem' }}>
              <Card.Img variant="top" src={`${process.env.REACT_APP_BASE_URL}/article/${article.article_id}/image`} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="Articles-card-description">
                  {article.description}
                </Card.Text>
                <div className="Articles-card-buttons">

                  <ButtonGroup size="sm">
                    <Button
                      className="Articles-card-buttons-one"
                      variant="primary"
                      type="submit"
                      onClick={() => addArticleToProgram(article.article_id)}
                    >
                      Ajouter au programme
                    </Button>
                    <Button
                      className="Articles-card-buttons-one"
                      variant="info"
                      type="submit"
                      onClick={() => deleteOneArticleFromFavorite(article.article_id)}
                    >
                      <Icon icon="bin" size="1rem" />
                    </Button>
                  </ButtonGroup>

                </div>
              </Card.Body>
            </Card>
          </article>
        ))}
      </Form>
    </div>
  );
}

export default Favorite;

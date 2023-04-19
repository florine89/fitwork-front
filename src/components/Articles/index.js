/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { NavLink, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { instance } from '../../middleware/getAPI';

import { getCategoriesList } from '../../selectors/categories';

function Articles() {
  // Loader
  const [isLoading, toggleIsLoading] = useState(false);

  // Gestion des messages
  const [showFav, setShowFav] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showProg, setShowProg] = useState(false);
  const handleCloseFav = () => setShowFav(false);
  const handleCloseProg = () => setShowProg(false);
  const handleCloseError = () => setShowError(false);

  // récupérer tous les articles de la catégorie

  const [articles, setArticles] = useState([]); // je récupère les articles dans le state local

  const { id } = useParams(); // je recupère l'id de la catégorie dans la requete http

  /**
   * Cette fonction recupère la liste des articles de la catégorie concernée
  */
  function getArticleByCategorie() {
    toggleIsLoading(true);
    instance.get(`/category/${id}`)
      .then((response) => {
        setArticles(response.data); // j'importe mes data dans le state local
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        toggleIsLoading(false);
      });
  }

  // Afficher le nom de la catégorie
  const categories = useSelector(getCategoriesList);

  /**
   * On récupère la liste des catégories dans le state de redux
   * @returns le nom de la categorie
   */
  function getCategoryName() {
    // eslint-disable-next-line arrow-body-style
    const categoryName = categories.find((category) => {
      // console.log('category id', category.id);
      // eslint-disable-next-line radix
      // console.log('id use params', parseInt(id));
      // eslint-disable-next-line radix
      return category.id === parseInt(id);
    });
    // console.log('categoryName', categoryName.name);
    return categoryName.name ? categoryName.name : '';
  }

  /**
   * A chaque changement d'id, useEffect rappelle la fonction concernée et met à jour l'affichage
   */
  useEffect(() => {
    getArticleByCategorie();
  }, [id]);

  // ajouter un article au programme

  const userId = useSelector((state) => state.user.id); // je recupère mon user id avec redux

  /**
   * A la soumission du formulaire, évite le comportement par défaut
   * de rechargement de la page par exemple
  */
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  /**
 * La fonction permet d'ajouter un article au programme sur le onClick.
 * @param {*} idArticle Sur le onClick, on lui passe l'arguemnt article.id.
 * La fonction anonyme évite que la fonction ne s'exécute seule au rendu.
 */
  function addArticleToProgram(idArticle) {
    instance
      .post(`/article/${idArticle}/program`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        setShowProg(true);
        console.log((response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ajouter un article aux favoris

  /**
   * La fonction permet d'ajouter un article aux favoris sur le onClick.
   * @param {*} idArticle Sur le onClick, on lui passe l'arguemnt article.id.
   * La fonction anonyme évite que la fonction ne s'exécute seule au rendu.
   */
  function addArticleToFavorites(idArticle) {
    instance
      .post(`/article/${idArticle}/favorite`, {
        user_id: userId, // je passe le user id du state
      })
      .then((response) => {
        setShowFav(true);
        console.log((response.data));
      })
      .catch((error) => {
        setShowError(true);
        console.error(error);
      });
  }

  return (
    <div className="Articles">

      <h1 className="Articles-title">
        Nos articles "{getCategoryName()}"
      </h1>

      {isLoading
        && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

      <Modal show={showFav} onHide={handleCloseFav}>
        <Modal.Header closeButton>
          <Modal.Title>C'EST OK</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cet article a bien été ajouté à tes favoris!</Modal.Body>
      </Modal>

      <Modal show={showProg} onHide={handleCloseProg}>
        <Modal.Header closeButton>
          <Modal.Title>C'EST OK</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cet article a bien été ajouté à ton programme!</Modal.Body>
      </Modal>

      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>OUPS</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cet article est déjà dans tes favoris!</Modal.Body>
      </Modal>

      {!isLoading && (
        <Form className="Articles-form" onSubmit={handleSubmit}>
          {articles.map((article) => (
            <article key={article.id} className="Articles-card">
              <Card style={{ width: '18rem', height: '25rem' }}>
                <Card.Img className="Articles-photo" variant="top" src={`${process.env.REACT_APP_BASE_URL}/article/${article.id}/image`} />
                <Card.Body>
                  <Card.Title as={NavLink} to={`/article/${article.id}`} className="Articles-card-title">{article.title}</Card.Title>
                  <Card.Text className="Articles-card-description">
                    {article.description}
                  </Card.Text>
                  <div className="Articles-card-buttons">

                    <ButtonGroup vertical>
                      <DropdownButton
                        as={ButtonGroup}
                        title="Ajouter l'article"
                        id="bg-vertical-dropdown-1"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          type="submit"
                          onClick={() => addArticleToProgram(article.id)}
                        >à mon programme
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="2"
                          type="submit"
                          onClick={() => addArticleToFavorites(article.id)}
                        >
                          à mes favoris
                        </Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>

                  </div>
                </Card.Body>
              </Card>
            </article>
          ))}
        </Form>
      )}
    </div>
  );
}

export default Articles;

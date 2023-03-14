/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import { instance } from '../../../middleware/getAPI';

import './ModifyArticles.scss';

export default function ModifyArticles({ articles, setArticles }) {
  const id = useSelector((state) => state.user.id);

  function getArticles() {
    instance
      .get(`/user/${id}/articles`)
      .then((response) => {
        setArticles(response.data);
      });
  }

  /// Fonction pour modifier les informations de profil

  function removeArticle(idArticle) {
    instance
      .delete(`/article/${idArticle}`, {
        data: { user_id: id },
      })
      .then((response) => {
        console.log(response.data);

        const newArticles = articles.filter((article) => article.id !== idArticle);
        setArticles(newArticles);
      })
      .catch(
        (error) => {
          console.log(error);
        },
      );
  }
  // Avec le hook de React, j'affiche au premier rendu de ma page les données
  useEffect(() => {
    if (id) getArticles();
  }, [id]);

  return (
    <div className="card-modify">
      {articles.map((article) => (
        <div key={article.id}>
          <Card className="card-modify_body" style={{ width: '18rem', height: '25rem' }}>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text className="Articles-card-description">
                {article.description}
              </Card.Text>
              <Card.Img className="card-modify_img" variant="top" src={`${process.env.REACT_APP_BASE_URL}/article/${article.id}/image`} />
              <div className="card-modify_body_modif">

                <ButtonGroup size="sm" className="card-modify_btn">
                  <Button
                    as={NavLink}
                    to={`article/${article.id}`}
                  >
                    Modifier
                  </Button>
                  <Button
                    className="card-modify_body_delete"
                    type="submit"
                    onClick={() => removeArticle(article.id)}
                  >
                    Supprimer
                  </Button>
                </ButtonGroup>

              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

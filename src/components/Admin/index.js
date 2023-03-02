/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { getCategoriesList } from '../../selectors/categories';
import { getArticlesList } from '../../selectors/articles';

function Admin() {
  // const id = useSelector((state) => state.user.id))
  const categories = useSelector(getCategoriesList);
  const articles = useSelector(getArticlesList);

  return (
    <Form className="Admin">

      <Form.Group
        className="mb-3"
        controlId="category.ControlSelect"
      >
        <Form.Label>Choisi ta catégorie</Form.Label>
        <Form.Select aria-label="Liste des catégories">
          {categories.map((category) => (
            <option
              key={category.name}
            >
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="article.ControlSelect"
      >
        <Form.Label>Choisi ton article</Form.Label>
        <Form.Select aria-label="Liste des articles">
          {articles.map((article) => (
            <option
              key={article.id}
            >
              {article.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button className="Profil-button" type="submit">Modifier mes informations</Button>

    </Form>
  );
}

export default Admin;

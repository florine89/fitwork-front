import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './style.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import { getCategoriesList } from '../../selectors/categories';

function Categories() {
  const categories = useSelector(getCategoriesList);

  return (
    <div className="Categories">
      <h1 className="Categories-title">Les catégories</h1>

      <ListGroup>
        {categories.map((category) => (
          <Card
            className="Categories-card"
            style={{ width: '18rem' }}
            bg="light"
            as={NavLink}
            key={category.id}
            to={`/categorie/${category.id}`}
          >
            <Card.Header className="Categories-card-header">{category.name}</Card.Header>
            <Card.Body>Description de la catégorie</Card.Body>
          </Card>
        ))}
      </ListGroup>

    </div>
  );
}

export default Categories;

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { findCategories } from '../../selectors/categories';

import './style.scss';

function Categories() {
  const { id } = useParams();
  console.log(id);

  const category = useSelector((state) => findCategories(state.categories.list, id));
  // console.log(category);

  return (
    <div className="Articles">
      <h1 className="presentation-title">Article</h1>
    </div>
  );
}

export default Categories;

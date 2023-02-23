import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { findArticle } from '../../selectors/articles';

import './style.scss';

function Articles() {
  const { id } = useParams();
  // console.log(id);

  // const article = useSelector((state) => findArticle(state.articles.list, id));
  console.log(useSelector((state) => findArticle(state.articles.list, id)));

  return (
    <div className="Articles">
      <h1 className="presentation-title">Article</h1>
    </div>
  );
}

export default Articles;
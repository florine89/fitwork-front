// import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { findArticle } from '../../selectors/articles';

import './style.scss';

function Articles() {
  const { id } = useParams();
  // console.log(id);

  const article = useSelector((state) => findArticle(state.articles.list, id));
  // console.log(article);

  return (
    <div className="Articles">
      <h1 className="presentation-title">{article.id}</h1>
    </div>
  );
}

/* Articles.propTypes = {
  title: PropTypes.string.isRequired,
}; */

export default Articles;

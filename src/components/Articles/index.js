import './style.scss';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { getArticlesList } from '../../selectors/articles';

export default function Articles() {
  const { id } = useParams();
  console.log('id de la catégori', id);

  const articles = useSelector(getArticlesList);
  console.log(articles);

  return (
    <div className="articles">
      <h1>articles</h1>

      {articles.map((article) => (
        <div
          key={article.id}
        >
          {article.title}
        </div>
      ))}

    </div>
  );
}

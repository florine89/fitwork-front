import './style.scss';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { getArticlesList } from '../../selectors/articles';

function Articles() {
  const { id } = useParams();
  console.log('id de la catégorie', id);

  const articles = useSelector(getArticlesList);
  console.log('articles', articles);

  /*   const articlee = useSelector((state) => findArticle(state.articles.list, id));
  console.log('articlee', articlee); */

  return (
    <div className="articles">
      <h1>Articles disponibles pour la categorie</h1>

      {articles.map((article) => (
        <ul
          key={article.id}
        >
          <li>Titre: {article.title}</li>
          <li>Description: {article.description}</li>
        </ul>
      ))}

    </div>
  );
}

export default Articles;

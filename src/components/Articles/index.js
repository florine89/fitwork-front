import './style.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useSelector } from 'react-redux';

// import { getArticlesList } from '../../selectors/articles';

function Articles() {
  const [articles, setArticles] = useState([]);

  const { id } = useParams();
  console.log('id de la catégorie', id);

  useEffect(() => {
    const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

    axios.get(`${API_BASE_URL}/category/${id}`).then((response) => {
      setArticles(response.data);
    });
  }, []);
  // const articles = useSelector(getArticlesList);
  // console.log('articles', articles);

  /*   const articlee = useSelector((state) => findArticle(state.articles.list, id));
  console.log('articlee', articlee); */

  return (
    <div className="articles">
      <h1>Articles disponibles pour la categorie</h1>

      {articles?.length && articles.map((article) => (
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

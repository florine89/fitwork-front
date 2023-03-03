import './style.scss';

import { NavLink } from 'react-router-dom';

import ArticleContainer from './Article';

function Home() {
  return (
    <div className="home">

      <h1 className="home-title-big">
        Un esprit sain, dans un corps sain !

        <span className="home-title-small">
          Pour travailler sainement.
        </span>
      </h1>

      <NavLink className="home-login" to="/inscription">Pour commencer inscrivez-vous ici</NavLink>

      <ArticleContainer />

    </div>
  );
}

export default Home;

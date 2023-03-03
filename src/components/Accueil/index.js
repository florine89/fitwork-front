import './style.scss';

import { NavLink } from 'react-router-dom';

import ArticleContainer from './Article';

function Home() {
  return (
    <div className="home">
      <div className="home-title">
        <h1 className="home-title-big">
          Un esprit sain, dans un corps sain !
          <span className="home-title-small">
            Pour travailler sainement.
          </span>
        </h1>
      </div>
      <NavLink to="/inscription">Pour commencer inscrivez-vous ici</NavLink>

      <ArticleContainer />

    </div>
  );
}

export default Home;

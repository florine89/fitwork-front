import './style.scss';

import { NavLink } from 'react-router-dom';

import ArticleContainer from './Article';

function Home() {
  return (
    <div className="home">

      <h1 className="home-quote">
        Un esprit sain, dans un corps sain !

        <span className="home-small">
          Pour travailler sainement.
        </span>
      </h1>

      <NavLink to="/inscription">Pour commencer inscrivez-vous ici</NavLink>

      <ArticleContainer />

    </div>
  );
}

export default Home;

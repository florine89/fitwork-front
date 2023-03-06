/* eslint-disable jsx-a11y/img-redundant-alt */
import './style.scss';

import { NavLink } from 'react-router-dom';
import ArticleContainer from './Article';
import logo2 from '../../assets/Home.jpg';

// import ArticleContainer from './Article';

function Home() {
  return (
    <div className="home">

      <div className="home-main">
        <h1 className="home-title-big">
          Un esprit sain, dans un corps sain !
          <span className="home-title-small">
            Pour travailler sainement.
          </span>
          <img src={logo2} alt="home-image" className="home-logo" />
        </h1>
      </div>

      <h2 className="home-description">
        FitWork vous suit au quotidien
      </h2>

      <NavLink className="home-login" to="/inscription">Découvres tous nos conseils bien-être en t'inscrivant ici!</NavLink>
      <ArticleContainer />
    </div>
  );
}

export default Home;

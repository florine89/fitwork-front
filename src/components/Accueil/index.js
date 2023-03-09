/* eslint-disable jsx-a11y/img-redundant-alt */
import './style.scss';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArticleContainer from './Article';
import logo2 from '../../assets/Home.jpg';
import logo3 from '../../assets/connecte.jpg';
import useScrollTop from '../../hooks';

function Home() {
  const isLogged = useSelector((state) => state.user.logged);
  const pseudo = useSelector((state) => state.user.firstname);
  return (
    <div className="home">
      <div className="home-main">
        { isLogged && (
          <useScrollTop>
            <p className="home-message">
              {`Hello ${pseudo} !`}
              <span className="home-message-program">"Chaque petits pas mène à un grand changement"</span>
              <img src={logo3} alt="picture-welcome" className="home-message-picture" />
            </p>
          </useScrollTop>
        )}
        { !isLogged && (
          <h1 className="home-title-big">
            Un esprit sain, dans un corps sain !
            <span className="home-title-small">
              Pour travailler sainement.
            </span>
            <img src={logo2} alt="home-image" className="home-logo" />
          </h1>
        )}
      </div>
      <p className="home-description">
        L'application FitWork te suit au bureau !
      </p>
      <p className="home-description2">
        Une application de conseils, d'exercices
        physiques et relaxant, pour maintenir ton bien-être au travail
      </p>
      <NavLink className="home-login" to="/inscription">Découvre tous nos conseils bien-être en t'inscrivant ici!</NavLink>
      <ArticleContainer />
    </div>
  );
}

export default Home;

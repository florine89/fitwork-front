import './style.scss';

import Nav from 'react-bootstrap/Nav';

import ArticleContainer from './Article';

import logo from '../../assets/femmebureau.jpg';

function Home() {
  return (
    <div className="home">

      <h1 className="home-quote">
        Un esprit sain, dans un corps sain !
        <h2 className="home-small">
          Pour travailler sainement.
        </h2>
      </h1>
      <Nav.Link variant="" href="/inscription">Pour commencer inscrivez-vous ici</Nav.Link>

      <ArticleContainer />

    </div>
  );
}

export default Home;

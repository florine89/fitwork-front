import './style.scss';

import Nav from 'react-bootstrap/Nav';

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

      <Nav.Link variant="" href="/inscription">Pour commencer inscrivez-vous içi</Nav.Link>

      <ArticleContainer />

    </div>
  );
}

export default Home;

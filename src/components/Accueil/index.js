import './style.scss';
import logo from '../../assets/femmebureau.jpg';

function Home() {
  return (
    <div className="home">
      <h1 className="home-quote">
        Un esprit sain, dans un corps sain !
        <span className="home-small">
          Pour travailler sainement.
        </span>
      </h1>
      <img src={logo} className="home-logo" alt="Logo FitWork" />
    </div>
  );
}

export default Home;

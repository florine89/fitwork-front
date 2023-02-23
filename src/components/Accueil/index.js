import './style.scss';
import logo from '../../assets/femmebureau.jpg';

function Home() {
  return (
    <div className="home">
      <img src={logo} className="home-logo" alt="Logo FitWork" />
    </div>
  );
}

export default Home;

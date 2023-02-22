import './style.scss';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/femmebureau.jpg';

function Home() {
  return (
    <Image className="image" src={logo} />
  );
}

export default Home;

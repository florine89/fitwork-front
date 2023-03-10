import logo from '../../assets/404.jpg';
import './style.scss';

export default function NotFound() {
  return (
    <div className="notfound">
      <h1 className="notfound-title">Oups !!!</h1>
      <p className="notfound-title-small">désolé cette page est introuvale...</p>
      <img className="notfound-img" src={logo} alt="404" />
    </div>
  );
}

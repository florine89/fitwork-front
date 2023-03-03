import './style.scss';

import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import logo from '../../assets/logo.png';
import logo1 from '../../assets/logofb.png';
import logo2 from '../../assets/insta.png';
import logo3 from '../../assets/whatsapp.png';

function Footer() {
  return (
    <div className="footer">

      {/* on enlève les navlink car header fixe
       <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/">
            <Image src={logo} className="footer-logo" alt="Logo FitWork" roundedCircle fluid />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/">Accueil</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1" href="/profil">Profil</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2" href="/programme">Programme</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-3" href="/favoris">Favoris</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-4" href="/categorie">Catégories</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-5" href="/contact">Contact</Nav.Link>
        </Nav.Item>
      </Nav> */}

      <div className="footer-link">
        <img className="footer-link-logo" href="#" src={logo2} alt="logo_instagram" />
        <img className="footer-link-logo" href="#" src={logo1} alt="logo_facebook" />
        <img className="footer-link-logo" href="#" src={logo3} alt="logo_whatsapp" />
      </div>

    </div>
  );
}

export default Footer;

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

      <div className="footer-link">
        <img className="footer-link-logo" href="#" src={logo2} alt="logo_instagram" />
        <img className="footer-link-logo" href="#" src={logo1} alt="logo_facebook" />
        <img className="footer-link-logo" href="#" src={logo3} alt="logo_whatsapp" />
      </div>

    </div>
  );
}

export default Footer;

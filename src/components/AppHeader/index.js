import './style.scss';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/fonts/logo.png';

function Header() {
  return (
    <header>

      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            <img src={logo} className="header-logo" alt="Logo FitWork" />
          </Link>
          <Navbar.Brand href="/">Accueil</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/inscription">S'incrire</Nav.Link>
              <Nav.Link href="/profil">Profil</Nav.Link>
              <Nav.Link href="/programme">Programme</Nav.Link>
              <Nav.Link href="/favoris">favoris</Nav.Link>
              <NavDropdown title="Catégories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Alimentation</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Exercices au bureau
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Moment de relaxation</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

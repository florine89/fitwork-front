import './style.scss';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { NavItem } from 'react-bootstrap';
import logo from '../../assets/fitworkblu.png';
import LoginForm from '../LoginForm';
// import Profil from '../Profil';

// la modif en getCategoriesList fait beuguer
import { getCategoriesList } from '../../selectors/articles';

function Header() {
  const categories = useSelector(getCategoriesList);
  const isLogged = useSelector((state) => state.user.logged);

  return (
    <header className="header">

      <Navbar bg="info" expand="lg">
        <Container>
          <Link to="/">
            <img src={logo} className="header-logo" alt="Logo FitWork" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* quand on est connecté ça affiche profil, programme, favoris, contact */}
              {isLogged && (
                <div className="Nav">
                  <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
                  <Nav.Link as={NavLink} to="/profil">Profil</Nav.Link>
                  <Nav.Link as={NavLink} to="/programme">Programme</Nav.Link>
                  <Nav.Link as={NavLink} to="/favoris">Favoris</Nav.Link>

                  <NavDropdown title="Catégories" id="basic-nav-dropdown">
                    {categories.map((category) => (
                      <NavDropdown.Item
                        as={NavLink}
                        key={category.name}
                        to={`/categorie/${category.name}`}
                      >
                        {category.name}
                      </NavDropdown.Item>
                    ))}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/categorie/4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
              {/* quand on est connecté ça affiche s'inscrire seulement */}
              {!isLogged && (
              <div className="Nav">
                <NavItem>
                  <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
                </NavItem>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/inscription">S'inscrire</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                </Nav.Item>
              </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <LoginForm />
      </Navbar>
    </header>
  );
}

export default Header;

import './style.scss';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { useSelector } from 'react-redux';
import { NavItem } from 'react-bootstrap';
import logo from '../../assets/fitworkblu.png';
import LoginForm from '../LoginForm';
// import Profil from '../Profil';

// la modif en getCategoriesList fait beuguer
import { getCategoriesList } from '../../selectors/categories';

function Header() {
  const categories = useSelector(getCategoriesList);
  const isLogged = useSelector((state) => state.user.logged);

  return (

    <Navbar className="sticky-top" bg="info" expand="lg">
      <Container>
        <Link to="/">
          <img src={logo} className="header-logo" alt="Logo FitWork" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* quand on est connecté ça affiche profil, programme, favoris, contact */}
            {isLogged && (
            <>
              <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
              <Nav.Link as={NavLink} to="/profil">Profil</Nav.Link>
              <Nav.Link as={NavLink} to="/programme">Programme</Nav.Link>
              <Nav.Link as={NavLink} to="/favoris">Favoris</Nav.Link>
              <Nav.Link as={NavLink} to="/administrateur">Administrateur</Nav.Link>

              <NavDropdown title="Catégories" id="basic-nav-dropdown">
                {categories.map((category) => (
                  <NavDropdown.Item
                    as={NavLink}
                    key={category.id}
                    to={`/categorie/${category.id}`}
                  >
                    {category.name}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/categories">
                  Toutes les catégories
                </NavDropdown.Item>
              </NavDropdown>
            </>
            )}
            {/* quand on est connecté ça affiche s'inscrire seulement */}
            {!isLogged && (
              <>
                <NavItem>
                  <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
                </NavItem>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                </Nav.Item>

              </>
            )}
          </Nav>
          {!isLogged && (
          <Button
            as={NavLink}
            className="login-button"
            variant="outline-secondary"
            to="/inscription"
            size="lg"
          >
            S'inscrire
          </Button>
          )}

          {/* <Nav.Link as={NavLink} to="/inscription">S'inscrire</Nav.Link> */}
          <LoginForm />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

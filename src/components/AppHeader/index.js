import { useSelector } from 'react-redux';

import './style.scss';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png';
import LoginForm from '../LoginForm';

import { getArticlesList } from '../../selectors/articles';

function Header() {
  const articles = useSelector(getArticlesList);

  return (
    <header>

      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            <img src={logo} className="header-logo" alt="Logo FitWork" />
          </Link>
          <Navbar.Brand>Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/inscription">S'inscrire</NavLink>
              <NavLink to="/profil">Profil</NavLink>
              <NavLink to="/programme">Programme</NavLink>
              <NavLink to="/favoris">Favoris</NavLink>
              <NavLink to="/contact">Contact</NavLink>

              {articles.map((article) => (
                <NavLink
                  key={article.id}
                  to={`/categorie/${article.id}`}
                >
                  {article.id}
                </NavLink>
              ))}

              <NavDropdown title="Catégories" id="basic-nav-dropdown">
                <NavDropdown.Item href="/categorie/1">Alimentation</NavDropdown.Item>

                <NavDropdown.Item href="/categorie/2">
                  Exercices au bureau
                </NavDropdown.Item>
                <NavDropdown.Item href="/categorie/3">Moment de relaxation</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/categorie/4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <LoginForm />
      </Navbar>
    </header>
  );
}

export default Header;

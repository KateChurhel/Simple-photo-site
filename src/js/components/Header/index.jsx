// libraries
import React from 'react';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// constants
import ROUTES from '../../constants/routes';

const Header = () => (
  <header>
    <Navbar bg="dark" className="text-uppercase py-1" collapseOnSelect expand="lg" fixed="top" variant="dark">
      <div className="container-fluid px-0">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="my-1" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="col-5">
            <NavLink activeClassName="active" className="nav-link" exact to={ROUTES.photos}>Photos</NavLink>
            <NavLink activeClassName="active" className="nav-link" exact to={ROUTES.contact}>Support</NavLink>
          </Nav>
          <Navbar.Brand className="logo mx-auto" href="/">Your best moments</Navbar.Brand>
          <Nav className="col-5 justify-content-end px-0">
            <Nav.Link href="https://www.instagram.com/" target="_blank">Instagram</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  </header>
);

export default Header;

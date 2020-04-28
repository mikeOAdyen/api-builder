import React from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import Logo from '../assets/adyen-logo.png';
import '../styles/Header.css';

const Header = () => {

  return (
    <div id="header">
      <Navbar expand="md">
        <NavbarBrand href="/"><img src={Logo} id="logo-img" alt="adyen-logo" /></NavbarBrand>
      </Navbar>
    </div>
  );
};

export default Header;

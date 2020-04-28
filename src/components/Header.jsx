import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Logo from '../assets/adyen-logo.png';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div id="header">
      <Navbar expand="md">
        <NavbarBrand href="/"><img src={Logo} id="logo-img" alt="adyen-logo" />Shop</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse id="nav-bar-collapse" isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/cart">Cart</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Payments
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/components">Components</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/dropin">Dropin</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

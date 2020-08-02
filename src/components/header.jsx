import React from "react";
import { Navbar,Nav, NavbarBrand, NavLink, NavItem } from "reactstrap";

import SearchBox from "./statefull/searchbox.jsx";

function HeaderComponent() {
  return (
    <div className="header">
      <Navbar>
        <NavbarBrand className="logo"  style={{color:"#53E0BC",opacity:"100%"}}>GrabIt!</NavbarBrand>
        <SearchBox />
        <Nav>
          <NavItem>
            <NavLink>offers</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default HeaderComponent;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../statefull/searchbox.jsx";

function HeaderComponent() {
  return (
    <div className="container-fluid">
      <div className="header">
        <div className="row  navbar">
          <div className="logo col- navbar-brand">Grab It!</div>
          <div className="col- nav-item">
            <SearchBox />
          </div>
          <div className="col- nav-item">
            <FontAwesomeIcon icon={faShoppingCart} className="header-icons" />
            <FontAwesomeIcon icon={faBell} className="header-icons" />
            <FontAwesomeIcon
              icon={faUserCircle}
              className="profile-placeholder header-icons"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;

import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBell,
  faUserCircle,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";

import {
  AuthenticationContext,
 
} from "../../context/context";

import ProfileModalSheet from "../stateless/profileModalSheet";
import SearchBox from "./searchbox";

function HeaderComponent() {
  const [isProfileClicked, setIsProfileClicked] = useState(false);

  const isAuthenticated = useContext(AuthenticationContext)[0];
  
  function profileClicked() {
    setIsProfileClicked(!isProfileClicked);
  }

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="row  navbar">
          <div className="logo col- navbar-brand">Grab It!</div>
          <div className="col- nav-item">
            <SearchBox />
          </div>
          <div className="col- nav-item">
            <FontAwesomeIcon icon={faQrcode} className="header-icons" />
            {isAuthenticated && (
              <span>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="header-icons"
                />
                <div className="cart-dot">
                  <h6>0</h6>
                </div>
                <FontAwesomeIcon icon={faBell} className="header-icons" />
                <div className="notification-dot">
                  <h6>0</h6>
                </div>
              </span>
            )}

            
            <FontAwesomeIcon
                  icon={faUserCircle}
                  className="profile-placeholder header-icons"
                  onClick={profileClicked}
                />
                {isProfileClicked && (
                  <ProfileModalSheet onClose={profileClicked} />
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;

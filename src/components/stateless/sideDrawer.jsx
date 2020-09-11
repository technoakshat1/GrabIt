//jshint esversion:6
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{
    faShoppingCart,
    faBell,
  } from "@fortawesome/free-solid-svg-icons";

function SideDrawer(props) {
  return (
    <div className={props.classList}>
      <nav>
        <ul>
          <li className="modal-options">
            <FontAwesomeIcon icon={faShoppingCart} className="modal-icons" />
            <div className="cart-mobile-dot">
              <h6>0</h6>
            </div>
            <h5 className="modal-text"  style={{ marginLeft:`12px`}}> Shopping Cart</h5>
          </li>
          <li className="modal-options">
            <FontAwesomeIcon icon={faBell} className="modal-icons" />
            <div className="notification-mobile-dot">
              <h6>0</h6>
            </div>
            <h5 className="modal-text" style={{ marginLeft:`17px`}}>  Notifications</h5>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideDrawer;

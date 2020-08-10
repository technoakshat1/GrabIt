import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBoxOpen,
  faHistory,
  faPercent,
  faSun,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

import ThemeContext,{SwitchContext} from "../../context/context";

import AppTheme from "../../AppTheme";

import MaterialSwitch from "./materialSwitch";

function ProfileModalSheet(props) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const currentTheme = AppTheme[themeMode];

  const [isChecked,setChecked] = useContext(SwitchContext);

  function onToggle() {
    setChecked(!isChecked);

    setThemeMode(themeMode === "light" ? "dark" : "light");
  }

  return (
    <div className="profile-modal">
      <div onClick={props.onClose}>
      <FontAwesomeIcon icon={faTimesCircle} className="close-icon"/>
      </div>
      <h3>UserName</h3>
      <p>extra information</p>
      <hr style={{ width: "100%" }} />

      <div className="modal-options">
        <FontAwesomeIcon icon={faUser} className="modal-icons" />
        <h5 className="modal-text"> Manage account</h5>
      </div>

      <div className="modal-options">
        <FontAwesomeIcon
          icon={faBoxOpen}
          className="modal-icons"
          id="MyOrders"
        />
        <h5 className="modal-text">Manage Orders</h5>
      </div>

      <div className="modal-options">
        <FontAwesomeIcon icon={faHistory} className="modal-icons" />
        <h5 className="modal-text"> history</h5>
      </div>

      <div className="modal-options">
        <FontAwesomeIcon icon={faPercent} className="modal-icons" />
        <h5 className="modal-text"> offers</h5>
      </div>

      <div className="modal-options">
        <FontAwesomeIcon icon={faSun} className="modal-icons" />
        <h5 className="modal-text"> Dark Mode</h5>

        <MaterialSwitch
          height={18}
          width={45}
          checked={isChecked}
          onChange={onToggle}
          onHandleColor={`${currentTheme.secondaryColorLight}`}
          onColor={`${currentTheme.secondaryColor}`}
        />
      </div>
    </div>
  );
}

export default ProfileModalSheet;

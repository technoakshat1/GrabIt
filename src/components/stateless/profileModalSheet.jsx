import React, { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBoxOpen,
  faHistory,
  faPercent,
  faSun,
  faTimesCircle,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
} from "../../context/context";

import AppTheme from "../../AppTheme";

import MaterialSwitch from "./materialSwitch";

function ProfileModalSheet(props) {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  const isAuthenticated = useContext(AuthenticationContext)[0];

  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const currentTheme = AppTheme[themeMode];

  const [isChecked, setChecked] = useContext(SwitchContext);

  const setOpen = useContext(LoginOverlayContext)[1];
  const setLoginContext = useContext(defaultLoginContext)[1];

  function onToggle() {
    setChecked(!isChecked);

    setThemeMode(themeMode === "light" ? "dark" : "light");
  }

  function useOutside(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.onClose(); //close profile modal sheet if someone clicks outside of it
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div
      className="profile-modal"
      ref={wrapperRef}
      style={
        isAuthenticated === true
          ? { marginLeft: `-6.6rem`, position: `absolute` }
          : { marginLeft: `-11rem` }
      }
    >
      <div onClick={props.onClose}>
        <FontAwesomeIcon icon={faTimesCircle} className="close-icon" />
      </div>

      {isAuthenticated && (
        <div>
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
        </div>
      )}

      {!isAuthenticated && (
        <span>
          <div
            className="modal-options"
            onClick={() => {
              setOpen(true);
              setLoginContext("signIn");
              return null;
            }}
          >
            <FontAwesomeIcon icon={faUserCheck} className="modal-icons" />
            <h5 className="modal-text"> Login</h5>
          </div>
          <div
            className="modal-options"
            onClick={() => {
              setOpen(true);
              setLoginContext("signUp");
              return null;
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} className="modal-icons" />
            <h5 className="modal-text"> SignUp</h5>
          </div>
        </span>
      )}

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

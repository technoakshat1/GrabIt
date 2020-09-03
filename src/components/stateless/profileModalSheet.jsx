import React, { useContext, useEffect, useRef } from "react";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
  ApiContext,
} from "../../context/context";


import {useMediaQuery} from "react-responsive";

import AppTheme from "../../AppTheme";

import {
  FETCH_USER_DATA,
  LOGOUT_CLEAR_USER_DATA,
} from "../../context/action.types";

import {logout,saveMode,fetchUserData} from "../../API/loginAPI";

import MaterialSwitch from "./materialSwitch";

function ProfileModalSheet(props) {
  
  const mobileView = useMediaQuery({query:"(max-width: 420px)"});

  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  const { userInfo, dispatch } = useContext(ApiContext);

  const [isAuthenticated, setIsAuthenticated] = useContext(
    AuthenticationContext
  );

  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const currentTheme = AppTheme[themeMode];

  const [isChecked, setChecked] = useContext(SwitchContext);

  const setOpen = useContext(LoginOverlayContext)[1];
  const setLoginContext = useContext(defaultLoginContext)[1];
  const instantiated = false;

  useEffect(
    (instantiated) => {
      if (isAuthenticated && !instantiated && userInfo.length === 0) {
        fetchUserData(onFetchUserData);
        console.log(userInfo);
        instantiated = true;
      }
      

    },
    [instantiated]
  );

  function onFetchUserData(response){
    dispatch({
      type: FETCH_USER_DATA,
      payload: response.data,
    });
  }

  
  function onToggle() {
    setChecked(!isChecked);

    setThemeMode(themeMode === "light" ? "dark" : "light");
  }

  function handleLogOut() {
    logout(logoutSuccess);
    saveMode(themeMode);
  }

  function logoutSuccess() {
    dispatch({
      type: LOGOUT_CLEAR_USER_DATA,
      payload: userInfo[0].username,
    });
    setIsAuthenticated(false);
    setOpen(false);
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
      if(!mobileView){
        document.addEventListener("mousedown", handleClickOutside);
      }else{
        document.addEventListener("touchstart", handleClickOutside);
      }
     
      return () => {
        // Unbind the event listener on clean up
        if(!mobileView){
          document.removeEventListener("mousedown", handleClickOutside);
        }else{
          document.removeEventListener("touchstart", handleClickOutside);
        }
       
      };
    }, [ref]);
  }

  return (
    <div
      className="profile-modal"
      ref={wrapperRef}
    >
      {isAuthenticated && (
        <div>
          <div className="modal-wrapper">
          <div className="modal-options">
            <h5 className="modal-text">Manage account</h5>
          </div>
          </div>
          <div className="modal-wrapper">
          <div className="modal-options">
            <h5 className="modal-text">Manage Orders</h5>
          </div>
          </div>
          <div className="modal-wrapper">
          <div className="modal-options">
            <h5 className="modal-text">history</h5>
          </div>
          </div>
          <div className="modal-wrapper">
          <div className="modal-options">
            <h5 className="modal-text">offers</h5>
          </div>
          </div>
          <div className="modal-wrapper">
          <div className="modal-options" onClick={handleLogOut}>
            <h5 className="modal-text"> Logout</h5>
          </div>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <span>
         <div className="modal-wrapper">
          <div
            className="modal-options"
            onClick={() => {
              setOpen(true);
              setLoginContext("signIn");
              return null;
            }}
          >
            <h5 className="modal-text"> Login</h5>
          </div>
          </div>
          <div className="modal-wrapper">
          <div
            className="modal-options"
            onClick={() => {
              setOpen(true);
              setLoginContext("signUp");
              return null;
            }}
          >
            <h5 className="modal-text"> SignUp</h5>
          </div>
          </div>
        </span>
      )}
      <div className="modal-wrapper">
      <div className="modal-options">
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
    </div>
  );
}

export default ProfileModalSheet;

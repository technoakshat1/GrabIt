import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";

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
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
  AuthenticationApiContext,
} from "../../context/context";

import AppTheme from "../../AppTheme";

import {FETCH_USER_DATA} from "../../context/action.types";

import MaterialSwitch from "./materialSwitch";

function ProfileModalSheet(props) {
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  const {userInfo,dispatch}=useContext(AuthenticationApiContext);

  const [isAuthenticated ,setIsAuthenticated]= useContext(AuthenticationContext);

  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const currentTheme = AppTheme[themeMode];

  const [isChecked, setChecked] = useContext(SwitchContext);

  const setOpen = useContext(LoginOverlayContext)[1];
  const setLoginContext = useContext(defaultLoginContext)[1];
  const instantiated=false;

  useEffect((instantiated)=>{
    if(isAuthenticated&&!instantiated){
      fetchUserData();
      console.log(userInfo);
      instantiated=true;
    }
  },[instantiated]);

  async function fetchUserData(){
    try{
      const response=await axios({
        method: 'get',
        withCredentials : true,
        crossdomain : true,
        url: 'http://localhost:3001/userInfo',
        
      });
      console.log(response);
      if(response.data.message==="success"){
        dispatch({
          type:FETCH_USER_DATA,
          payload:response.data.username,
        })
      }
      
    }catch(err){
      console.log(err);
    }
  }

  function onToggle() {
    setChecked(!isChecked);

    setThemeMode(themeMode === "light" ? "dark" : "light");
  }

  function handleLogOut() {
     logout();
  }

  async function logout(){
    try{
      const response=await axios({
          method: 'get',
          withCredentials : true,
          crossdomain : true,
          url: 'http://localhost:3001/signOut',
        });
         console.log(response);
         if(response.data.message==="success"){
            setIsAuthenticated(false);
            setOpen(false);
         }
      }catch(err){
          console.log(err);
      }
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
          <h3>{userInfo.length!==0?userInfo[0].username:null}</h3>
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
          <div className="modal-options" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} className="modal-icons" />
            <h5 className="modal-text"> Logout</h5>
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

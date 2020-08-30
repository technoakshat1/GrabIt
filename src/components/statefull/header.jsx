import React, { useState, useContext , useRef ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBell,
  faUserCircle,
  faQrcode,
  faSearch,
  faBars,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import {useMediaQuery} from "react-responsive";

import {
  AuthenticationContext,
 
} from "../../context/context";

import ProfileModalSheet from "../stateless/profileModalSheet";
import SearchBox from "./searchbox";
import SideDrawer from "../stateless/sideDrawer";

function HeaderComponent() {
  
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const mobileView = useMediaQuery({query:"(max-width: 420px)"});

  const [classList,setClassList] = useState("side-drawer");

  const [searchBoxRender,setSearchBoxRender]=useState(false);

  const isAuthenticated = useContext(AuthenticationContext)[0];
  
  function profileClicked() {
    setIsProfileClicked(!isProfileClicked);
  }
  
  function onSideDrawer(){
    setClassList("side-drawer open");
  }

  function searchBoxClicked(){
    setSearchBoxRender(true);
  }

  function backArrowClicked(){
    setSearchBoxRender(false);
  }

  function useOutside(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClassList("side-drawer"); //close profile modal sheet if someone clicks outside of it
        }
      }

      // Bind the event listener
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div>
      <div className="header">
        <div className="navbar">
        {mobileView&&!searchBoxRender&&isAuthenticated&& <FontAwesomeIcon icon={faBars} onClick={onSideDrawer} className="header-icons" style={{marginTop:"9px",fontSize:"24px",marginRight:"0"}}/>}
          
          {!searchBoxRender && <div className="logo navbar-brand">Grab It!</div>}
          {mobileView && searchBoxRender && <div>
            <FontAwesomeIcon icon={faArrowLeft} onClick={backArrowClicked} className="header-mobile-icon" style={{marginLeft:'12px',marginTop:'15px'}}/>
            <div className=" nav-item search-box-mobile">
            <SearchBox />
          </div>
          </div>}
         {!mobileView &&  <div className=" nav-item">
            <SearchBox />
          </div>}

          {mobileView &&!searchBoxRender&& <FontAwesomeIcon icon={faSearch} className="header-mobile-icon" onClick={searchBoxClicked}/> }
          

          {mobileView && <div ref={wrapperRef}><SideDrawer classList={`${classList}`}/></div> }
         {!searchBoxRender && 
          <div className="nav-item">
            <FontAwesomeIcon icon={faQrcode} className="header-icons" />
            {isAuthenticated && !mobileView &&(
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
         }
          
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;

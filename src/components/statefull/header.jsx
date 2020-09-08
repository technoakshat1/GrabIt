import React, { useState, useContext, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBell,
  faUserCircle,
  faQrcode,
  faSearch,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import AppTheme from "../../AppTheme";

import ThemeContext,{ AuthenticationContext, ApiContext,HeroRef ,LoginOverlayContext} from "../../context/context";

import LoginComponent from "./loginComponent";

import ProfileModalSheet from "../stateless/profileModalSheet";
import SearchBox from "./searchbox";
import SideDrawer from "../stateless/sideDrawer";

function HeaderComponent() {
  const { userInfo } = useContext(ApiContext);
  const {heroRef}=useContext(HeroRef);
  const open=useContext(LoginOverlayContext)[0];
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];


  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const mobileView = useMediaQuery({ query: "(max-width: 667px)" });

  const [isSticky,setSticky]=useState(false);

  const [searchBoxRender, setSearchBoxRender] = useState(false);

  const isAuthenticated = useContext(AuthenticationContext)[0];

  function profileClicked() {
    setIsProfileClicked(!isProfileClicked);
  }



  function handleScroll() {
    if (heroRef.current) {
      setSticky(heroRef.current.getBoundingClientRect().top<=-20);
      // console.log(heroRef.current.getBoundingClientRect().top);
    }
  }

  function searchBoxClicked() {
    setSearchBoxRender(true);
  }

  function backArrowClicked() {
    setSearchBoxRender(false);
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  });

  return (
      <div className={`header${isSticky ? ' scroll-header' : ''}`}>
        <div className="navbar">
          {/* {mobileView && !searchBoxRender && isAuthenticated && (
            <FontAwesomeIcon
              icon={faBars}
              onClick={onSideDrawer}
              className="header-icons"
              style={{ marginTop: "9px", fontSize: "24px", marginRight: "0" }}
            />
          )} */}

          {!searchBoxRender && (
            <div className="logo navbar-brand"> 
            <Link to="/" replace style={{textDecoration:"none",color:`${currentTheme.secondaryColor}`}}>
            Grab It!
            </Link>
            </div>
          )}
          {mobileView && searchBoxRender && (
            <div>
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={backArrowClicked}
                className="header-mobile-icon"
                style={{ marginLeft: "12px", marginTop: "15px" }}
              />
              <div className=" nav-item search-box-mobile">
                <SearchBox />
              </div>
            </div>
          )}
          {!mobileView && (
            <div className=" nav-item">
              <SearchBox />
            </div>
          )}

          {mobileView && !searchBoxRender && (
            <FontAwesomeIcon
              icon={faSearch}
              className="header-mobile-icon"
              onClick={searchBoxClicked}
            />
          )}

          {/* {mobileView && (
            <div ref={wrapperRef}>
              <SideDrawer classList={`${classList}`} />
            </div>
          )} */}
          {!searchBoxRender && (
            <div className="nav-item">
              <FontAwesomeIcon icon={faQrcode} className="header-icons" />
              {isAuthenticated && !mobileView && (
                <React.Fragment>
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
                </React.Fragment>
              )}

              {userInfo !== undefined &&
                userInfo.some((object) => object.profileImage) && (
                  <div className="button-profile" onClick={profileClicked}>
                  <FontAwesomeIcon icon={faBars} className="profile-button-bars"/>
                    <img
                      src={`${userInfo[0].profileImage}`}
                      className="profile-photo"
                    ></img>
                    {isProfileClicked && (
                      <ProfileModalSheet onClose={profileClicked} />
                    )}
                  </div>
                )}
              {userInfo !== undefined &&
                !userInfo.some((object) => object.profileImage) && (
                  <div className="button-profile" onClick={profileClicked}>
                  <FontAwesomeIcon icon={faBars} className="profile-button-bars"/>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="profile-placeholder"
                    />
                    {isProfileClicked && (
                      <ProfileModalSheet onClose={profileClicked} />
                    )}
                  </div>
                )}

            {open && <LoginComponent/>}
                
            </div>
          )}
        </div>
      </div>
  );
}

export default HeaderComponent;

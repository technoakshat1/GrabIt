import React, { useContext, useEffect } from "react";
import Helmet from "react-helmet";

import ThemeContext, { SwitchContext } from "../../context/context";

import AppTheme from "../../AppTheme";

import {getTheme} from "../../API/loginAPI";

function GlobalTheme() {
  const [theme, setTheme] = useContext(ThemeContext);
  const setChecked = useContext(SwitchContext)[1];

  const currentTheme = AppTheme[theme];

  const instantiated = false;

  useEffect(
    (instantiated) => {
      if (!instantiated) {
        getTheme(onGetTheme);
        instantiated = true;
      }
    },
    [instantiated]
  );

  function onGetTheme(mode) {
    setTheme(mode);
    setChecked(mode === "dark" ? true : false);
  }

  return (
    <Helmet>
      <style type="text/css">{`
          body{
            background-color:${currentTheme.primaryColorDark};
          }

          .logo{
            color:${currentTheme.secondaryColor};
          }

          .header{
            background-color: ${currentTheme.primaryColorMedium};
            color: ${currentTheme.textColor};
          }

          .profile-modal{
            background-color:${currentTheme.primaryColorMedium};
            color:${currentTheme.textColor};
          }
          .searchBox{
            background-color: ${currentTheme.primaryColorMedium};
            border-color:${currentTheme.primaryColorLight};
            color:${currentTheme.textColor};
          }
          .searchBox:focus{
           outline: none;
           border-color:${currentTheme.secondaryColor}; /*for dark theme color to be passed via context*/
          }
          .searchButton{
            color:${currentTheme.primaryColor};
            background-color:${currentTheme.primaryColorMedium};
            border-color:${currentTheme.primaryColorLight};
          }
          .searchButton:hover{
            color:${currentTheme.textColor};/*for dark theme color to be passed via context*/
            background-color:${currentTheme.primaryColorDark};/*for dark theme color to be passed via context*/
          }

          .login-card{
            background-color:${currentTheme.primaryColorMedium};
            color:${currentTheme.textColor};
          }

          #userName{
            outline:none;
            background-color:${currentTheme.primaryColorMedium};
            border-color:${currentTheme.primaryColorDark};
          }

          #userName:focus{
            border-color:${currentTheme.secondaryColor};
          }

          #password{
            outline:none;
            background-color:${currentTheme.primaryColorMedium};
            border-color:${currentTheme.primaryColorDark};
          }

          #password:focus{
            border-color:${currentTheme.secondaryColor};
          }

          .ghost{
            border-color:${currentTheme.secondaryColor};
            background-color:${currentTheme.secondaryColor};
          }

          .form{
            color:${currentTheme.textColor};
            background-color:${currentTheme.primaryColorMedium};
          }

          .form-control{
            background-color:${currentTheme.primaryColorLight};
            outline-color:${currentTheme.secondaryColor};
            color:${currentTheme.textColor};
          }

          .form-control:focus{
            color:${currentTheme.textColor};
            background-color:${currentTheme.primaryColorMedium};
          }

          .text-accent{
            color:${currentTheme.secondaryColor};
          }

          .modal-options{
            cursor:pointer;
          }

          .form-mobile{
            color:${currentTheme.textColor};
            background-color:${currentTheme.primaryColorMedium};
          }

          .side-drawer{
            background-color:${currentTheme.primaryColorMedium}
          }
        `}</style>
    </Helmet>
  );
}

export default GlobalTheme;

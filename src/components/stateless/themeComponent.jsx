//jshint esversion:6
import React, { useContext, useEffect } from "react";
import Helmet from "react-helmet";

import ThemeContext, { SwitchContext } from "../../context/context";

import AppTheme from "../../AppTheme";

import { getTheme } from "../../API/loginAPI";

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
            background-color:${currentTheme.primaryColorMedium};
            font-family: 'Source Sans Pro', sans-serif;
            font-weight:thin;
            overflow-x:hidden;
            overflow-y:scroll;
            color:${currentTheme.textColor};
          }

          .active{
            background-color:${currentTheme.secondaryColor};
            color:white;
          }

          .central-wrapper:hover{
            background-color:${
              theme === "dark"
                ? `rgba(252, 250, 250,0.5)`
                : `rgba(0, 0, 0, 0.12)`
            };
            width:100%;
            border-radius:0 35px 35px 0;
          }

          .active:hover{
            background-color:${currentTheme.secondaryColorLight};
            width:80%;
          }

          .control-panel{
            background-color:${currentTheme.primaryColorMedium};
            {/* background-color:${currentTheme.p}; */}
          }

          .account-dashboard{
            background-color:${currentTheme.primaryColorLight};
          }


          .footer{
            background-color:${currentTheme.primaryColorLight};
            color:${currentTheme.textColor};
          }

          .account-verification-welcome{
            color:${currentTheme.textColor};
          }

          .Categories-background{
            background-color:${currentTheme.secondaryColor};
            color:${theme === "dark" ? "#ffff" :`${currentTheme.primaryColorMedium}` };
          }

          .progress-bar{
            stroke:${theme === "dark" ? `${currentTheme.secondaryColor}` :'#303f9f' };
          }

          .Categories-background h1{
            font-family:'Pacifico';
            padding:2rem;
          }

          .category-card-container{
            background-color:${theme==='dark'?`${currentTheme.primaryColorMedium}`:"#fdd835"};
          }

          .card-footer{
            font-family:'Source Sans Pro';
            font-weight:800;
            color:${currentTheme.textColor};
            background-color:${theme==='dark'?`${currentTheme.primaryColorMedium}`:"#fdd835"};
          }

          .button-profile{
            border-color: ${theme === "dark" ? "#6d6d6d" : "#DDDDDD"};

          }

          .button-profile:hover{
            box-shadow:${
              theme === "dark" && `0 1px 6px 0 rgba(252, 250, 250,0.5)`
            };
          }

          .logo-link{
            color:${currentTheme.secondaryColor};
          }

          .header{
            background-color: ${currentTheme.primaryColorMedium};
            color: ${currentTheme.textColor};
            border-color: ${
              theme === "dark" ? "#6d6d6d" : currentTheme.primaryColorDark
            };
          }

          .profile-modal{
            background-color:${currentTheme.primaryColorMedium};
            color:${currentTheme.textColor};
            box-shadow:${
              theme === "dark" && `rgba(252, 250, 250,0.5) 0px 2px 16px;`
            };
          }
          .searchBox{
            background-color:${currentTheme.primaryColorMedium} ;
            border-color:${
              theme === "dark" ? "#6d6d6d" : currentTheme.primaryColorLight
            };
            color:${currentTheme.textColor};
          }
          .searchBox:focus{
           outline: none;
           /*border-color:${
             currentTheme.secondaryColor
           };*/ /*for dark theme color to be passed via context*/
          }

          .searchBox:focus,.searchBox:hover{
            box-shadow:${
              theme === "dark" && `0 1px 6px 0 rgba(252, 250, 250,0.5)`
            }
          }
          .searchBox-AutoSuggest{
            box-shadow:${
              theme === "dark" && `0 4px 6px 0 rgba(252, 250, 250,0.5)`
            }
          }
          .modal-wrapper:hover{
            background-color:${
              theme === "dark"
                ? `rgba(252, 250, 250,0.5)`
                : `rgba(0, 0, 0, 0.12)`
            };
          }
          .searchButton{
            color:${currentTheme.primaryColor};
            background-color:${currentTheme.primaryColorMedium};
            border-color:${
              theme === "dark" ? "#6d6d6d" : currentTheme.primaryColorLight
            };
          }
          .searchButton:hover{
            color:${
              currentTheme.textColor
            };/*for dark theme color to be passed via context*/
            background-color:${
              currentTheme.primaryColorDark
            };/*for dark theme color to be passed via context*/
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

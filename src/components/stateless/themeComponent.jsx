import React,{useContext} from "react";
import Helmet from "react-helmet";

import ThemeContext from "../../context/context";

import AppTheme from "../../AppTheme";

function GlobalTheme(){

    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];

    return(
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
        `}</style>
      </Helmet>
    );
}

export default GlobalTheme;
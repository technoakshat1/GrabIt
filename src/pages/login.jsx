import React from 'react';
import GlobalTheme from '../components/stateless/themeComponent';
import HeaderComponent from "../components/statefull/header";

import LoginCard from "../components/statefull/loginComponent";

function LoginPage(){
    
    return(
     <div>
         <GlobalTheme/>
         <HeaderComponent/>
         <LoginCard/>
     </div>
    );
}

export default LoginPage;
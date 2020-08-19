import React, { useState ,useReducer,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
  AuthenticationApiContext
} from "./context/context.jsx";

import axios from "axios";

import AuthenticationReducer from "./context/AuthenticationReducer.jsx";


import HomePage from "./pages/homepage.jsx";

import "./App.css";

function App() {
  const themeHook = useState("light");
  const profileTabOpen = useState(false);
  const isAuthenticated = useState(false);
  const loginOverlay = useState(false);
  const defaultLoginComponent=useState("signIn");
  const [userInfo,dispatch]=useReducer(AuthenticationReducer,[]);

  useEffect(()=>{
    isLoggedIn();
  });

  async function isLoggedIn(){
      const response=await axios({
        method: 'get',
        withCredentials : true,
        crossdomain : true,
        url: 'http://localhost:3001/signIn',
      });

      console.log(response);

      if(response.data.message==="Authenticated"){
         isAuthenticated[1](true);
      }
  }

  return (
    <ThemeContext.Provider value={[...themeHook]}>
      <SwitchContext.Provider value={[...profileTabOpen]}>
        <AuthenticationContext.Provider value={[...isAuthenticated]}>
          <LoginOverlayContext.Provider value={[...loginOverlay]}>
           <defaultLoginContext.Provider value={[...defaultLoginComponent]}>
            <AuthenticationApiContext.Provider value={{userInfo,dispatch}}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Router>
            </AuthenticationApiContext.Provider>
            </defaultLoginContext.Provider>
          </LoginOverlayContext.Provider>
        </AuthenticationContext.Provider>
      </SwitchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

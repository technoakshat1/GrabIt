import React, { useState ,useReducer,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
  ApiContext
} from "./context/context.jsx";

import axios from "axios";

import Reducer from "./context/Reducer.jsx";

import HomePage from "./pages/homepage.jsx";

import "./App.css";

import {isLoggedIn} from "./API/loginAPI.js";

function App() {
  const themeHook = useState("light");
  const profileTabOpen = useState(false);
  const isAuthenticated = useState(false);
  const loginOverlay = useState(false);
  const defaultLoginComponent=useState("signIn");
  const [userInfo,dispatch]=useReducer(Reducer,[]);

  useEffect(()=>{
    isLoggedIn(onSuccess);
  });

  function onSuccess(){
    isAuthenticated[1](true);
  }

  return (
    <ThemeContext.Provider value={[...themeHook]}>
      <SwitchContext.Provider value={[...profileTabOpen]}>
        <AuthenticationContext.Provider value={[...isAuthenticated]}>
          <LoginOverlayContext.Provider value={[...loginOverlay]}>
           <defaultLoginContext.Provider value={[...defaultLoginComponent]}>
            <ApiContext.Provider value={{userInfo,dispatch}}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Router>
            </ApiContext.Provider>
            </defaultLoginContext.Provider>
          </LoginOverlayContext.Provider>
        </AuthenticationContext.Provider>
      </SwitchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

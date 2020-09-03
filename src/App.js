import React, { useState ,useReducer,useEffect,useRef} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
  ApiContext,
  HeroRef
} from "./context/context.jsx";

import {FETCH_USER_DATA}from "./context/action.types";

import Reducer from "./context/Reducer.jsx";

import HomePage from "./pages/homepage.jsx";

import "./App.css";

import {isLoggedIn,fetchUserData} from "./API/loginAPI.js";

function App() {
  const themeHook = useState("light");
  const profileTabOpen = useState(false);
  const isAuthenticated = useState(false);
  const loginOverlay = useState(false);
  const defaultLoginComponent=useState("signIn");
  const [userInfo,dispatch]=useReducer(Reducer,[]);
  const heroRef=useRef(null);

  useEffect(()=>{
    isLoggedIn(onSuccess,unAuthenticated);
  },[isLoggedIn]);

  function onFetchUserData(response){
    dispatch({
      type: FETCH_USER_DATA,
      payload: response.data,
    });
  }

  function onSuccess(){
    isAuthenticated[1](true);
    fetchUserData(onFetchUserData);
  }

  function unAuthenticated(){
    isAuthenticated[1](false);
  }

  return (
    <ThemeContext.Provider value={[...themeHook]}>
      <SwitchContext.Provider value={[...profileTabOpen]}>
        <AuthenticationContext.Provider value={[...isAuthenticated]}>
          <LoginOverlayContext.Provider value={[...loginOverlay]}>
           <defaultLoginContext.Provider value={[...defaultLoginComponent]}>
            <ApiContext.Provider value={{userInfo,dispatch}}>
             <HeroRef.Provider value={{heroRef}}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Router>
            </HeroRef.Provider>
            </ApiContext.Provider>
            </defaultLoginContext.Provider>
          </LoginOverlayContext.Provider>
        </AuthenticationContext.Provider>
      </SwitchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

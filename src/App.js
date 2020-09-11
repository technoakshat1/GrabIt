//jshint esversion:6
import React, { useState, useReducer, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext,
  ApiContext,
  HeroRef,
  ThemeSaveContext,
} from "./context/context.jsx";

import { FETCH_USER_DATA } from "./context/action.types";

import Reducer, { ThemeReducer } from "./context/Reducer.jsx";

import HomePage from "./pages/homepage.jsx";

import AccountVerificationPage from "./pages/AccoutVerification";

import AccountDashboard from "./pages/AccountDashboard";

import "./App.css";

import { isLoggedIn, fetchUserData } from "./API/loginAPI.js";

function App() {
  const themeHook = useState("light");
  const profileTabOpen = useState(false);
  const isAuthenticated = useState(false);
  const loginOverlay = useState(false);
  const defaultLoginComponent = useState("signIn");
  const [userInfo, dispatch] = useReducer(Reducer, []);
  const [isThemeSaved, dispatchSaveTheme] = useReducer(ThemeReducer, false);
  const heroRef = useRef(null);

  useEffect(() => {
    // console.log("hello");
    isLoggedIn(onSuccess, unAuthenticated);
  });

  function onFetchUserData(response) {
    dispatch({
      type: FETCH_USER_DATA,
      payload: response.data,
    });
  }

  function onSuccess() {
    isAuthenticated[1](true);
    fetchUserData(onFetchUserData);
  }

  function unAuthenticated() {
    isAuthenticated[1](false);
  }

  return (
    <ThemeContext.Provider value={[...themeHook]}>
      <SwitchContext.Provider value={[...profileTabOpen]}>
        <AuthenticationContext.Provider value={[...isAuthenticated]}>
          <LoginOverlayContext.Provider value={[...loginOverlay]}>
            <defaultLoginContext.Provider value={[...defaultLoginComponent]}>
              <ApiContext.Provider value={{ userInfo, dispatch }}>
                <ThemeSaveContext.Provider
                  value={{ isThemeSaved, dispatchSaveTheme }}
                >
                  <HeroRef.Provider value={{ heroRef }}>
                    <Router>
                      <Switch>
                        <Route exact path="/">
                          <HomePage />
                        </Route>
                        <Route exact path="/account-verification">
                          <AccountVerificationPage />
                        </Route>
                        <Route exact path="/account-dashboard">
                          <AccountDashboard />
                        </Route>
                      </Switch>
                    </Router>
                  </HeroRef.Provider>
                </ThemeSaveContext.Provider>
              </ApiContext.Provider>
            </defaultLoginContext.Provider>
          </LoginOverlayContext.Provider>
        </AuthenticationContext.Provider>
      </SwitchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

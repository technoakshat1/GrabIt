import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext, {
  SwitchContext,
  AuthenticationContext,
  LoginOverlayContext,
  defaultLoginContext
} from "./context/context.jsx";

import HomePage from "./pages/homepage.jsx";

import "./App.css";

function App() {
  const themeHook = useState("light");
  const profileTabOpen = useState(false);
  const isAuthenticated = useState(false);
  const loginOverlay = useState(false);
  const defaultLoginComponent=useState("signIn");

  return (
    <ThemeContext.Provider value={[...themeHook]}>
      <SwitchContext.Provider value={[...profileTabOpen]}>
        <AuthenticationContext.Provider value={[...isAuthenticated]}>
          <LoginOverlayContext.Provider value={[...loginOverlay]}>
           <defaultLoginContext.Provider value={[...defaultLoginComponent]}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Router>
            </defaultLoginContext.Provider>
          </LoginOverlayContext.Provider>
        </AuthenticationContext.Provider>
      </SwitchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

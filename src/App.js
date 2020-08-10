import React,{useState}from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ThemeContext,{SwitchContext} from "./context/context.jsx";

import HomePage from "./pages/homepage.jsx";

import "./App.css";

function App() {
  
  const themeHook=useState("light");
  const profileTabOpen=useState(false);


  return (
    <ThemeContext.Provider value={[...themeHook]}>
     <SwitchContext.Provider value={[...profileTabOpen]}>
      <Router>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
      </SwitchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

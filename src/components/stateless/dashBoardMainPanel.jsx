import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashBoardContext } from "../../context/context";
import { useSpring, animated } from "react-spring";
import Overview from "../statefull/overview";

function DashBoardMainPanel() {
  const animation = useContext(dashBoardContext)[0];

  const props = useSpring({
    from: { width: "88%", left: "10%" },
    to: { width: animation ? "76%" : "88%", left: animation ? "23%" : "10%" },
  });


  return (
    <animated.div className="dashboard-panel" style={props}>
      <h1 style={{ marginBottom: "3rem" }}>Personal Account</h1>
      <Router>
        <Switch>
          <Route
            exact
            path="/account-dashboard/overview"
            component={Overview}
          />
        </Switch>
      </Router>
    </animated.div>
  );
}

export default DashBoardMainPanel;

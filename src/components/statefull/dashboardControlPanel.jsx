import React, { useContext, useRef, useState } from "react";
import { ApiContext, HeroRef } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faChartPie,
  faBoxes,
  faHistory,
  faBars,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

import { useSpring, animated } from "react-spring";

function DashboardControlPanel() {
  const { userInfo } = useContext(ApiContext);
  const { heroRef } = useContext(HeroRef);
  const overviewRef = useRef();
  const ordersRef = useRef();
  const profileRef = useRef();
  const historyRef = useRef();
  const privacyRef = useRef();
  const [previousRef, setPreviousRef] = useState(overviewRef);
  const [isBarClicked, setIsBarClicked] = useState(false);
  const [props, set] = useSpring(() => {
    return {
      from: { width: "8%" },
    };
  });

  const [optionProps, hideOptions] = useSpring(() => {
    return {
      from: { opacity: 0 },
    };
  });

  const [barProps, setBars] = useSpring(() => {
    return {
      from: {
        fontSize: "3rem",
        marginRight: "0rem",
        marginLeft: "0rem",
        marginBottom: "0rem",
      },
    };
  });

  const AnimatedIcon = animated(FontAwesomeIcon);

  function handleClick(e, currentRef) {
    e.currentTarget.classList.add("active");

    previousRef.current.classList.remove("active");

    setPreviousRef(currentRef);
  }

  function handleBarClick() {
    setIsBarClicked(!isBarClicked);
    if (!isBarClicked) {
      set({ width: "22%" });
      hideOptions({ opacity: 1, visibility: "visible" });
      setBars({
        fontSize: "2rem",
        marginRight: "3rem",
        marginLeft: "-5rem",
      });
    } else {
      set({ width: "8%" });
      hideOptions({ opacity: 0, visibility: "hidden" });
      setBars({
        fontSize: "3rem",
        marginRight: "0rem",
        marginLeft: "0rem",
      });
    }
  }

  return (
    <animated.div className="control-panel" ref={heroRef} style={props}>
      <div className="control-panel-header">
        <AnimatedIcon icon={faBars} style={barProps} onClick={handleBarClick} />
        {userInfo[0] && userInfo.some((object) => object.profileImage) ? (
          <animated.img
            src={userInfo[0].profileImage}
            alt="pro"
            style={optionProps}
          />
        ) : (
          <AnimatedIcon icon={faUserCircle} style={optionProps} />
        )}

        <animated.h4 style={optionProps}>
          {userInfo[0] && userInfo[0].username}
        </animated.h4>
      </div>
      <div className="control-panel-central">
        <div
          className="active central-wrapper"
          ref={overviewRef}
          onClick={(e) => {
            handleClick(e, overviewRef);
          }}
        >
          <div className="central-options">
            <FontAwesomeIcon icon={faChartPie} />
            <animated.p style={optionProps}>Overview</animated.p>
          </div>
        </div>
        <div
          className="central-wrapper"
          ref={historyRef}
          onClick={(e) => {
            handleClick(e, historyRef);
          }}
        >
          <div className="central-options">
            <FontAwesomeIcon icon={faHistory} />
            <animated.p style={optionProps}> History</animated.p>
          </div>
        </div>
        <div
          className="central-wrapper"
          ref={ordersRef}
          onClick={(e) => {
            handleClick(e, ordersRef);
          }}
        >
          <div className="central-options">
            <FontAwesomeIcon icon={faBoxes} />
            <animated.p style={optionProps}>Orders</animated.p>
          </div>
        </div>
        <div
          className="central-wrapper"
          ref={profileRef}
          onClick={(e) => {
            handleClick(e, profileRef);
          }}
        >
          <div className="central-options">
            <FontAwesomeIcon icon={faUserCircle} />
            <animated.p style={optionProps}> Profile</animated.p>
          </div>
        </div>
        <div
          className="central-wrapper"
          ref={privacyRef}
          onClick={(e) => {
            handleClick(e, privacyRef);
          }}
        >
          <div className="central-options">
            <FontAwesomeIcon icon={faKey} />
            <animated.p style={optionProps}> Privacy</animated.p>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default DashboardControlPanel;

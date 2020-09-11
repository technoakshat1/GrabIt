//jshint esversion:6
import React from "react";
import { useSpring, animated, config } from "react-spring";

function ProgressBarCircular() {
  const props = useSpring({
    from: { strokeDasharray: "1,200", strokeDashoffset: "0" },
    to: async (next) => {
      await next({ strokeDasharray: "89,200", strokeDashoffset: "-35" });
      await next({ strokeDasharray: "89,200", strokeDashoffset: "-124" });
    },
    config:config.stiff,
    loop: true,
  });

  return (
  <div className="loader">
    <svg className="progress-bar-container">
      <animated.circle
        className="progress-bar"
        r="20"
        cx="60"
        cy="60"
        stroke-miterlimit="10"
        style={props}
      />
    </svg>
    </div>
  );
}

export default ProgressBarCircular;

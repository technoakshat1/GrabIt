import React, { useRef, useState } from "react";
import { useSpring, animated, config, useChain } from "react-spring";

function Notification(props) {
  const notificationRef = useRef();
  const lifeRef = useRef();
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const [boxAnimation, setBoxAnimation, stopBoxAnimation] = useSpring(() => ({
    from: { top: "-60rem" },
    top: "0rem",
    config: { tension: 125, friction: 20, mass: 1.5 },
    ref: notificationRef,
  }));
  const [lifeAnimation, setLife, stopLife] = useSpring(() => ({
    from: { width: "0%" },
    width: "100%",
    config: { duration: 5000 },
    ref: lifeRef,
    onRest: () => {
      if (!isMouseEnter) {
        setBoxAnimation({
          top: "-60rem",
          delay: 100,
          config: { tension: 125, friction: 20, mass: 1.5 },
          onRest: () => {
            props.onClose();
          },
        });
      } else {
        stopBoxAnimation();
      }
    },
  }));

  useChain([notificationRef, lifeRef]);

  // onMouseEnter={stopLife()} onMouseLeave={}

  return (
    <animated.div
      className="notification-box"
      style={boxAnimation}
      onMouseEnter={() => {
        setLife({ width: "50%" });
        stopLife();
        setIsMouseEnter(true);
        setBoxAnimation({
          top: "0rem",
          config: { tension: 125, friction: 20, mass: 1.5 },
        });
      }}
      onMouseLeave={() => {
        setLife({
          width: "100%",
          config: { duration: 5000 },
          onRest: () => {
            if (!isMouseEnter) {
              setBoxAnimation({
                top: "-60rem",
                delay: 100,
                config: { tension: 125, friction: 20, mass: 1.5 },
                onRest: () => {
                  props.onClose();
                },
              });
            } else {
              stopBoxAnimation();
            }
          },
        });
        setIsMouseEnter(false);
      }}
    >
      <div className="notification-message">
        <p>
          {props.message !== undefined
            ? props.message
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur consectetur tortor, vitae venenatis dui porttitor sed. Donec ac lacus et magna luctus finibus. Nullam blandit velit ut massa placerat ultricies. Pellentesque diam nibh, condimentum eget viverra ac, sagittis vel nisi."}
        </p>
      </div>
      <animated.div className="life" style={lifeAnimation} />
    </animated.div>
  );
}

export default Notification;

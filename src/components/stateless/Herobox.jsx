//jshint esversion:6
import React, {useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import { HeroRef } from "../../context/context";
import { useSpring, animated, useChain} from "react-spring";

function HeroBox(heroprops) {
  const { heroRef } = useContext(HeroRef);
  const imageRef=useRef();
  const textRef=useRef();

  const AnimatedButton=animated(Button);

  const imageProps = useSpring({from :{opacity:1},to:{opacity:0.35},ref:imageRef});

  const textProps= useSpring({ from :{opacity:0},opacity:1,ref:textRef});

  useChain([imageRef,textRef],[2,3]);

  

  return (
    <div className="hero-box" ref={heroRef}
    >
      <div
        className="hero-opacity"
      >
        <animated.img
          style={imageProps}
          className="hero-image"
          src="./assets/images/heroboxImg4.jpg"
          alt="HeroBox"
        />
      </div>
      <animated.div className="hero-text" style={textProps}>
        <h1>
          Grab everything that you can ! <br /> Now even COVID-19 can't stop
          your daily needs!
        </h1>
        <h2>Introducing GrabIt!</h2>
        <p>
          We started this project with an intention to let people grab their
          needs without any hassle. <br /> And you don't have to stand in long
          queues outside stores.
          <br />
          Best thing we will take care of social distancing for you.
          <br /> Want to know more how we started ?
        </p>
      </animated.div>
      <AnimatedButton variant="warning" onClick={()=>heroprops.onKnowMore()} style={textProps}>Know More</AnimatedButton>
    </div>
    
  );
}

export default HeroBox;

import React,{ useContext} from "react";
import Button from "react-bootstrap/Button";
import {HeroRef} from "../../context/context";

function HeroBox() {
  const {heroRef}=useContext(HeroRef);

  return (
    <div className="hero-box" ref={heroRef}>
      <div className="hero-opacity">
          <img className="hero-image" src="./assets/images/heroboxImg4.jpg" />
        </div>
      <div className="hero-text">
        <h1>Grab everything that you can ! <br/> Now even COVID-19 can't stop your daily needs!</h1>
        <h2>Introducing GrabIt!</h2>
        <p>
          We started this project with an intention to let people grab their
          needs without any hassle. <br/> And you don't have to stand in long queues outside stores.
          <br/>Best thing we will take care of social distancing for you.<br/> Want to know more how we started ?
        </p>
       
       <Button variant="warning">Know More</Button>
      </div>
    </div>
  );
}

export default HeroBox;

import React,{useContext} from "react";
import GlobalTheme from "../components/stateless/themeComponent";
import Header from "../components/statefull/header";
import Footer from "../components/stateless/footer";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {HeroRef} from "../context/context";

function OauthRedirect(props) {
    const {heroRef}=useContext(HeroRef);
  return (
    <div>
      <GlobalTheme />
      <Header />
      {props.success&&(
        <React.Fragment>
        <h1 style={{top:"5rem",position:"relative",textAlign:"center"}} ref={heroRef}>Account Sign Up success!</h1>
      <p style={{position:"relative",top:"5rem",textAlign:"center"}}>
        You have successfully signedUp on<br/>
        <span style={{ fontFamily: "Pacifico", fontWeight: "300",fontSize:"3rem" }}>
          GrabIt!
        </span><br/><br/>
        Now to further continue please check your email inbox <br/> Or spams folder
        for a verification email from <br/> our team click the link on it and you
        would be good to go!!<br/><br/>
        <Button variant="success">
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
          <h5>Back to Home</h5>  
        </Link>
      </Button> 
      </p>
      </React.Fragment>
      )}
      {!props.success&&(
          <React.Fragment>
          <h1 style={{top:"5rem",position:"relative",textAlign:"center"}} ref={heroRef}>Account Sign Up failure!</h1>
      <p style={{position:"relative",top:"5rem",textAlign:"center"}}>
      <img
            style={{
              left: "-10%",
              width: "30%",
              borderRadius: "24px",
              height: "40%",
              display: "inline",
            }}
            src="../../assets/images/404error.png"
            alt="403"
          ></img>
          Oh no! oops some error caused the sign up to fail please try again later!
       <br/><br/>
        <Button variant="danger">
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
          <h5>Back to Home</h5>  
        </Link>
      </Button> 
      </p>
          </React.Fragment>
      )}
      <Footer/>
    </div>
  );
}

export default OauthRedirect;

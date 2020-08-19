import React, { useState, useRef, useContext, useEffect } from "react";
import qs from "qs";
import axios from "axios";

import { AUTHENTICATE_LOCAL } from "../../context/action.types";

import {
  LoginOverlayContext,
  defaultLoginContext,
  AuthenticationApiContext,
  AuthenticationContext,
} from "../../context/context";

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const container = useRef(null);
  const [component ,setComponent]= useContext(defaultLoginContext);
  const setIsAuthenticated = useContext(AuthenticationContext)[1];
  const setOpen=useContext(LoginOverlayContext)[1];
  function onSignUp() {
    setComponent("signUp");
    container.current.classList.add("right-panel-active");
  }
  function onSignIn() {
    setComponent("signIn");
    container.current.classList.remove("right-panel-active");
  }

  useEffect(() => {
    defaultComponentCall(component);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (username !== "" && password !== "") {
      authenticateLocal(username,password);
    }
  }

  async function authenticateLocal(username,password){
    try{
       const response=await axios({
        method: 'post',
        headers:{
            'content-type': 'application/x-www-form-urlencoded'
        },
        withCredentials : true,
        crossdomain : true,
        url: 'http://localhost:3001/signIn',
        data: qs.stringify({
          username: username,
          password: password,
        })
      });
       console.log(response);
       if(response.status===200){
         handleLoginSuccess();
       }
    }catch(err){
        console.log(err);
    }
}

// function onGoogleClick(e){
//   e.preventDefault();
//   authenticateGoogle();
// }


// async function authenticateGoogle(){
//   try{
//     const response=await axios({
//      method: 'get',
//      withCredentials : true,
//      crossdomain : true,
//      url: 'http://localhost:3001/signIn/google',
//    });
//     console.log(response);
//     if(response.status===200){
//       handleLoginSuccess();
//     }
//  }catch(err){
//      console.log(err);
//  }
// }

 function handleLoginSuccess(){
  setIsAuthenticated(true);
  setOpen(false);
 }

  function defaultComponentCall(component) {
    switch (component) {
      case "signIn":
        onSignIn();
        break;
      case "signUp":
        onSignUp();
        break;
      default:
        console.log("default executed");
    }
  }

  return (
    <div>
      <div className="container" id="container" ref={container}>
        <div className="form-container sign-up-container">
          <form action="#" className="form">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social text-accent">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="http://localhost:3001/signIn/google" className="social text-accent">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social text-accent">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" className="form-control" />
            <input type="email" placeholder="Email" className="form-control" />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <button className="ghost" onClick={onSignUp}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className="form">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social text-accent">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a  href="http://localhost:3001/signIn/google" className="social text-accent">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social text-accent">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <a href="#" className="text-accent">
              Forgot your password?
            </a>
            <button className="ghost"  onClick={handleSubmit}>
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={onSignIn}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={onSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;

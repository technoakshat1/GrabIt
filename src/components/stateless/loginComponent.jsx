import React, { useRef, useContext, useEffect } from "react";

import { defaultLoginContext } from "../../context/context";

function LoginCard() {
  const container = useRef(null);
  const component = useContext(defaultLoginContext)[0];
  function onSignUp() {
    container.current.classList.add("right-panel-active");
  }
  function onSignIn() {
    container.current.classList.remove("right-panel-active");
  }

  useEffect(() => {
    defaultComponentCall(component);
  });

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
              <a href="#" className="social text-accent">
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
              <a href="#" className="social text-accent">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social text-accent">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" className="form-control" />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <a href="#" className="text-accent">
              Forgot your password?
            </a>
            <button className="ghost" onClick={onSignIn}>
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

//jshint esversion:6
import React, { useState, useRef, useContext, useEffect } from "react";
import { authenticateLocal } from "../../API/loginAPI";
import { signUp } from "../../API/signupAPI";

import validator from "email-validator";
import passwordStrength from "check-password-strength";

import ThemeContext, {
  LoginOverlayContext,
  defaultLoginContext,
  AuthenticationContext,
  SwitchContext,
} from "../../context/context";

import { useMediaQuery } from "react-responsive";

import Notification from "./notificationBox";
import ProgressBarCircular from "../stateless/progressBar";

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordStr, setPasswordStr] = useState("");
  const [signUpSucess, setSignUpSuccess] = useState(false);
  const [signUpFailure, setSignUpFailure] = useState(false);
  const [signInFailure,setSignInFailure]=useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [progressBar, setProgressBar] = useState(false);
  const [signUpWrongCred, setSignUpWrongCred] = useState(false);

  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [emailValidity, setEmailValidity] = useState(true);

  const container = useRef(null);
  const [component, setComponent] = useContext(defaultLoginContext);
  const setIsAuthenticated = useContext(AuthenticationContext)[1];
  const [open, setOpen] = useContext(LoginOverlayContext);
  const setThemeMode = useContext(ThemeContext)[1];
  const setChecked = useContext(SwitchContext)[1];
  const mobileView = useMediaQuery({ query: "(max-width: 667px)" });
  const [signIn, setSignIn] = useState(false);
  const [loginCredentials, setLoginCredential] = useState(false);
  const [signUpCredentials, setSignUpCredential] = useState(false);
  const wrapperRef = useRef(null);
  useOutside(container);

  function onSignUp() {
    setComponent("signUp");
    if (!mobileView) {
      container.current.classList.add("right-panel-active");
      // eslint-disable-next-line no-console
      console.log(container.current.classList);
    } else {
      setSignIn(false);
    }
  }
  function onSignIn() {
    setComponent("signIn");
    if (!mobileView) {
      container.current.classList.remove("right-panel-active");
    } else {
      setSignIn(true);
    }
  }

  function enterCredentials() {
    setLoginCredential(true);
    setSignIn(false);
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(component);
    defaultComponentCall(component);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (username !== "" && password !== "") {
      setProgressBar(true);
      authenticateLocal(
        username,
        password,
        handleLoginSuccess,
        handleLoginFailure
      );
    }
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (
      username !== "" &&
      password !== "" &&
      emailValidity &&
      passwordStr === "Strong"
    ) {
      setProgressBar(true);
      signUp(
        email,
        username,
        password,
        () => {
          setSignUpSuccess(true);
          setProgressBar(false);
        },
        () => {
          setSignUpFailure(true);
        }
      );
    } else {
      setSignUpWrongCred(true);
    }
  }

  function validateEmail(email) {
    if (validator.validate(email)) {
      setEmailValidity(true);
    } else {
      setEmailValidity(false);
    }
    setEmail(email);
  }

  function passwordStrengthChecker(password) {
    if (password) {
      const value = passwordStrength(password).value;
      setPasswordStr(value);
    } else {
      setPasswordStr("");
    }
    setPassword(password);
  }

  function useOutside(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (!mobileView && ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }

      // Bind the event listener
      if (!mobileView) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.addEventListener("touchstart", handleClickOutside);
      }

      return () => {
        // Unbind the event listener on clean up
        if (!mobileView) {
          document.removeEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("touchstart", handleClickOutside);
        }
      };
    }, [ref]);
  }

  function handleLoginSuccess(response) {
    setWrongCredentials(false);
    setIsAuthenticated(true);
    setSignInSuccess(true);
    setProgressBar(false);
    if (response && response.data && response.data.mode) {
      setThemeMode(response.data.mode);
    }

    setChecked(response.data.mode === "dark" ? true : false);
  }

  function handleLoginFailure() {
    console.log("loginfailure");
    setWrongCredentials(true);
    setProgressBar(false);
    setSignInFailure(true);
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
    <div className="login-overlay">
      <span>
        {signUpSucess && (
          <Notification
            message={`Success account verification in-progress! 
    \nWe have sent an verification email at ${email}.
    \nIf the email doesn't arrive check in junk or spam folders for email 
    or add grabit@accountverificationgrabit.email to your contact list!`}
            onClose={() => setOpen(false)}
          />
        )}
        {signInSuccess && (
          <Notification
            message="login successfull! enjoy shopping with us Happy shopping! "
            onClose={() => setOpen(false)}
          />
        )}
        
        {(signUpFailure||signInFailure)&&<Notification message="Currently our servers are down please try again later!!" onClose={() => setOpen(false)}/>}
         

        {signUpWrongCred && (
          <Notification message="Please enter all information correctly and check if password is in strong category try using numbers and special symbols!!" />
        )}

        {!mobileView && (
          <div className="l-container" id="container" ref={container}>
            <div className="form-container sign-up-container">
              <form action="#" className="form">
                <h1>Create Account</h1>
                <div className="social-container">
                  <a
                    className="social text-accent"
                    href="http://localhost:3001/signIn/facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="http://localhost:3001/signIn/google"
                    className="social text-accent"
                  >
                    <i className="fab fa-google"></i>
                  </a>
                  <a
                    className="social text-accent"
                    href="http://localhost:3001/signIn/twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
                <span>or use your email for registration</span>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoComplete="off"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => validateEmail(e.target.value)}
                  value={email}
                  autoComplete="off"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => {
                    passwordStrengthChecker(e.target.value);
                  }}
                  value={password}
                />
                {passwordStr === "Weak" && (
                  <h5 style={{ color: `red`, fontSize: `16px` }}>
                    Strength:Weak
                  </h5>
                )}
                {passwordStr === "Medium" && (
                  <h5 style={{ color: `#eb6834`, fontSize: `16px` }}>
                    Strength:Medium
                  </h5>
                )}
                {passwordStr === "Strong" && (
                  <h5 style={{ color: `Green`, fontSize: `16px` }}>
                    Strength:Strong hmm good to go 🦾
                  </h5>
                )}
                {!emailValidity && (
                  <h5 style={{ color: `red`, fontSize: `12px` }}>
                    Please check your email it's invalid!
                  </h5>
                )}
                <button className="ghost" onClick={handleSignUp}>
                  Sign Up
                </button>
                {progressBar && (
                  <div className="signUp-loader">
                    <ProgressBarCircular />
                  </div>
                )}
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="#" className="form">
                <h1>Sign in</h1>
                <div className="social-container">
                  <a
                    className="social text-accent"
                    href="http://localhost:3001/signIn/facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="http://localhost:3001/signIn/google"
                    className="social text-accent"
                  >
                    <i className="fab fa-google"></i>
                  </a>
                  <a
                    className="social text-accent"
                    href="http://localhost:3001/signIn/twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
                <span>or use your account</span>
                <input
                  type="text"
                  placeholder="Username"
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

                {wrongCredentials && (
                  <h5 style={{ color: `red`, fontSize: `12px` }}>
                    Please check your username and password!
                  </h5>
                )}

                <a className="text-accent">Forgot your password?</a>
                <button className="ghost" onClick={handleSubmit}>
                  Sign In
                </button>

                {progressBar && (
                  <div className="login-loader">
                    <ProgressBarCircular />
                  </div>
                )}
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
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
        )}
        {mobileView && signIn && (
          <div className="overlay-mobile-container" ref={container}>
            <div className="overlay-signIn-mobile">
              <div className="overlay-mobile-panel">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={enterCredentials}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
        {mobileView && signIn && loginCredentials && (
          <div className="form-container-mobile sign-in-mobile-container">
            <form action="#" className="form-mobile" ref={wrapperRef}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a
                  className="social text-accent"
                  href="http://localhost:3001/signIn/facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="http://localhost:3001/signIn/google"
                  className="social text-accent"
                >
                  <i className="fab fa-google"></i>
                </a>
                <a
                  className="social text-accent"
                  href="http://localhost:3001/signIn/twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="text"
                placeholder="Username"
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

              {wrongCredentials && (
                <h5 style={{ color: `red`, fontSize: `12px` }}>
                  Please check your username and password!
                </h5>
              )}

              <a className="text-accent">Forgot your password?</a>
              <button className="ghost" onClick={handleSubmit}>
                Sign In
              </button>
              {progressBar && (
                <div className="login-loader">
                  <ProgressBarCircular />
                </div>
              )}
            </form>
          </div>
        )}
        {mobileView && !signIn && signUpCredentials && (
          <div
            className="form-container-mobile sign-up-mobile-container"
            ref={wrapperRef}
          >
            <form action="#" className="form-mobile">
              <h1>Create Account</h1>
              <div className="social-container">
                <a
                  className="social text-accent"
                  href="http://localhost:3001/signIn/facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="http://localhost:3001/signIn/google"
                  className="social text-accent"
                >
                  <i className="fab fa-google"></i>
                </a>
                <a
                  className="social text-accent"
                  href="http://localhost:3001/signIn/twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                autoComplete="off"
              />
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => validateEmail(e.target.value)}
                value={email}
                autoComplete="off"
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => passwordStrengthChecker(e.target.value)}
                value={password}
                autoComplete="off"
              />
              {passwordStr === "Weak" && (
                <h5 style={{ color: `red`, fontSize: `16px` }}>
                  Strength:Weak
                </h5>
              )}
              {passwordStr === "Medium" && (
                <h5 style={{ color: `#eb6834`, fontSize: `16px` }}>
                  Strength:Medium
                </h5>
              )}
              {passwordStr === "Strong" && (
                <h5 style={{ color: `Green`, fontSize: `16px` }}>
                  Strength:Strong hmm good 🦾
                </h5>
              )}
              {!emailValidity && (
                <h5 style={{ color: `red`, fontSize: `12px` }}>
                  Please check your email it's invalid!
                </h5>
              )}
              <button className="ghost" onClick={handleSignUp}>
                Sign Up
              </button>
              {progressBar && (
                <div className="login-loader">
                  <ProgressBarCircular />
                </div>
              )}
            </form>
          </div>
        )}

        {mobileView && !signIn && (
          <div className="overlay-mobile-container" ref={container}>
            <div className="overlay-signUp-mobile">
              <div className="overlay-mobile-panel">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setSignUpCredential(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </span>
    </div>
  );
}

export default LoginCard;

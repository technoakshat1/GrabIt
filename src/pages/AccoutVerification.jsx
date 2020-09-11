import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GlobalTheme from "../components/stateless/themeComponent";
import HeaderComponent from "../components/statefull/header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ApiContext, HeroRef } from "../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  accountVerification,
  isAccountPendingForVerification,
} from "../API/signupAPI";

import Notification from "../components/statefull/notificationBox";
import ProgressCircle from "../components/stateless/progressBar";
import Footer from "../components/stateless/footer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AccountVerificationPage() {
  const query = useQuery();
  const { userInfo } = useContext(ApiContext);
  const { heroRef } = useContext(HeroRef);
  const [verificationStatus, setVerificationStatus] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const username = query.get("username");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [progressBar, setProgressBar] = useState(false);

  useEffect(() => {
    isAccountPendingForVerification(username, (status) => {
      if (status) {
        setVerificationStatus(false);
      }
    });
  });

  function handleSubmit(e) {
    e.preventDefault();
    setProgressBar(true);
    // console.log("hello");
    // console.log(data);
    if (
      firstName !== "" &&
      surname !== "" &&
      address !== "" &&
      postalCode !== ""
    ) {
      const data = {
        username: query.get("username"),
        firstName: firstName,
        surname: surname,
        email: `${email !== "" ? email : query.get("email")}`,
        address: address,
        postalCode: postalCode,
        city: city,
        state: "Gujarat",
        country: "India",
      };
      // console.log(data);
      accountVerification(data, handleVerificationSuccess);
    }
  }

  function handleVerificationSuccess() {
    // console.log("success");
    setProgressBar(false);
    setVerificationSuccess(true);
  }

  return (
    <div>
      <GlobalTheme />
      <HeaderComponent />
      {verificationSuccess && (
        <Notification
          message="Verification successfull Welcome to GrabIt!"
          onClose={() => {}}
        />
      )}
      {verificationStatus && (
        <div className="account-verification-welcome" ref={heroRef}>
          <img
            src="./assets/images/404error.png"
            style={{
              left: "-10%",
              width: "30%",
              borderRadius: "24px",
              height: "40%",
              display: "inline",
            }}
            alt="403"
          ></img>
          <h2
            style={{
              right: "10%",
              margin: "0",
              fontSize: "2rem",
              display: "inline",
              position: "relative",
            }}
          >
            403 Oops this page is not allowed press logo for home
          </h2>
        </div>
      )}
      {!verificationStatus && (
        <span>
          <div className="account-verification-welcome" ref={heroRef}>
            {!userInfo[0] &&
              !userInfo.some((object) => object.profileImage) && (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="account-verification-placeholder"
                />
              )}
            {userInfo[0] && (
              <img
                src={
                  userInfo[0] &&
                  userInfo.some((object) => object.profileImage) &&
                  userInfo[0].profileImage
                }
                alt="pri"
              />
            )}

            <h3>
              {userInfo[0] ? userInfo[0].username : query.get("username")}
            </h3>
            <h1>
              Welcome to{" "}
              <span style={{ fontFamily: "Pacifico", fontWeight: "300" }}>
                GrabIt!
              </span>
            </h1>
            <p>
              Hello and welcome to GrabIt!
              <br />
              Here below you can find the form fill all the required details
              with{" "}
              <span style={{ color: "red" }}>red labels and asterikes(*)</span>
              <br /> You can fill in the non-required details but they aren't
              needed!
              <br />
              And yes enjoy shopping with GrabIt! and any problem immediately
              contact us at customer-support_grabit@gmail.com
              <br /> We hope you will enjoy shopping with GrabIt! <br />
              <br />
              <span
                style={{
                  fontFamily: "Pacifico",
                  fontWeight: "300",
                  fontSize: "24px",
                }}
              >
                Akshat Chhaya , Rushi Jobanputra , Drashti Patel
              </span>
              <br /> (Software Engineering team)
            </p>
          </div>
          <Form className="account-verification-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupFirstname">
              <Form.Label className="label-first-name required">
                First Name*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name here"
                defaultValue={
                  userInfo[0] ? userInfo[0].username : query.get("username")
                }
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGroupSurname">
              <Form.Label className="label-first-name required">
                Surname*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Surname here"
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                value={surname}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label-first-name required">
                Email*
              </Form.Label>
              <Form.Control
                type="email"
                readOnly={userInfo[0] || query.get("email") ? true : false}
                defaultValue={
                  userInfo[0] ? userInfo[0].email : query.get("email")
                }
                placeholder="Enter Email here"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGroupAddress1">
              <Form.Label className="label-first-name required">
                Address Line 1*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Line 1 addresss here"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGroupAddress2">
              <Form.Label className="label-first-name">
                Address Line 2
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Line 2 addresss here"
                onChange={(e) => {
                  setAddress(address + ",\n" + e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGroupAddress3">
              <Form.Label className="label-first-name">
                Address Line 3
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Line 3 addresss here"
                onChange={(e) => {
                  setAddress(address + ",\n" + e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPostalCode">
              <Form.Label className="label-first-name required">
                Postal Code*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Postal Code"
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                value={postalCode}
              />
            </Form.Group>
            <Form.Group controlId="formGroupCity">
              <Form.Label className="label-first-name required">
                City*
              </Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value="Ahemdabad">Ahemdabad</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Nadiad">Nadiad</option>
                <option value="Anand">Anand</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Bharuch">Bharuch</option>
                <option value="Ankleshwar">Ankleshwar</option>
                <option value="Surat">Surat</option>
                <option value="Other">
                  Other (sorry not avaiable for your city but usable in above
                  ones)
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGroupState">
              <Form.Label className="label-first-name required">
                State*
              </Form.Label>
              <Form.Control
                type="text"
                readOnly
                defaultValue="Gujarat"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGroupCountry">
              <Form.Label className="label-first-name required">
                Country*
              </Form.Label>
              <Form.Control
                type="text"
                readOnly
                defaultValue="India"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="outline-success"
              type="submit"
              size="lg"
              disabled={progressBar}
            >
              {progressBar ? (
                <div style={{ height: "2rem" }}>
                  <ProgressCircle />
                </div>
              ) : (
                `Submit`
              )}
            </Button>
          </Form>
        </span>
      )}
      <Footer/>
    </div>
  );
}

export default AccountVerificationPage;

import React, { useContext, useState, useEffect } from "react";
import {notificationContext ,editContext} from "../../context/context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { fetchProfileInfo, editProfileInfo } from "../../API/profileAPI";
import Spinner from "react-bootstrap/Spinner";

function Overview() {
  const [readOnly, setReadOnly] = useContext(editContext);
  const [profileFetched, setProfileFetch] = useState(false);
  const setSubmit = useContext(notificationContext)[1];
  const [progress, setProgress] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo(
      (data) => {
        setProfileInfo(data);
        setProfileFetch(true);
      },
      () => console.log("failure")
    );
    //  console.log(profileInfo);
  }, [profileFetched]);

  function handleSubmit(e) {
    if (readOnly) {
      setReadOnly(false);
    } else {
      e.preventDefault();
      if (
        profileInfo.firstName !== "" &&
        profileInfo.surname !== "" &&
        profileInfo.address !== "" &&
        profileInfo.postalCode !== ""
      ) {
        const data = {
          username: profileInfo.username,
          firstName: profileInfo.firstName,
          surname: profileInfo.surname,
          email: profileInfo.email,
          address: profileInfo.address,
          postalCode: profileInfo.postalCode,
          city: profileInfo.city,
          state: "Gujarat",
          country: "India",
        };
        // console.log(data);
        setProgress(true);
        editProfileInfo(
          data,
          () => {
            console.log("success");
            setReadOnly(true);
            setProgress(false);
            setSubmit(true);
          },
          () => {
            console.log("failure");
          }
        );
      }
    }
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="formGridEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            readOnly
            defaultValue={profileFetched ? profileInfo.username : ""}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Firstname"
              readOnly={readOnly}
              defaultValue={profileFetched ? profileInfo.firstName : ""}
              onChange={(e) => {
                setProfileInfo({
                  ...profileInfo,
                  firstName: e.currentTarget.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              readOnly={readOnly}
              defaultValue={profileFetched ? profileInfo.surname : ""}
              onChange={(e) => {
                setProfileInfo({
                  ...profileInfo,
                  surname: e.currentTarget.value,
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="1234 Main St"
            onChange={(e) => {
              setProfileInfo({
                ...profileInfo,
                address: e.currentTarget.value,
              });
            }}
            readOnly={readOnly}
            defaultValue={profileFetched ? profileInfo.address : ""}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              readOnly={readOnly}
              size="lg"
              value={profileFetched ? profileInfo.city : ""}
              onChange={(e) => {
                setProfileInfo({
                  ...profileInfo,
                  city: e.target.value,
                });
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

          <Form.Group as={Col} controlId="formGridState" readOnly>
            <Form.Label>State</Form.Label>
            <Form.Control readOnly defaultValue="Gujarat" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              readOnly={readOnly}
              defaultValue={profileFetched ? profileInfo.postalCode : ""}
              onChange={(e) => {
                setProfileInfo({
                  ...profileInfo,
                  postalCode: e.currentTarget.value,
                });
              }}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="info" type="button" onClick={handleSubmit} block>
          {progress ? <Spinner animation="border" /> : ""}
          {"   "}
          {readOnly ? "Edit" : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default Overview;

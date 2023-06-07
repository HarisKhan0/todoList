import React, { useState } from "react";
import "./Login.css";
// import { Link } from "react-router-dom";

function Login(props) {
  // Login status object
  const [loginStatus, setLoginStatus] = useState("");

  // Credentials object
  const [Credential, setCredential] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCredential({
      ...Credential,
      [name]: value,
    });
  }

  function submitLogin(event) {
    event.preventDefault();
    setLoginStatus("Logging in...");
    props
      .isCredentialValid(Credential)
      .then((isCredentialValid) => {
        if (isCredentialValid) {
          setLoginStatus("Login successful!");
          // TODO store the username, used for creating new tasks, change to different page
          window.location.href = "http://localhost:3000/TaskList";
        } else {
          setLoginStatus("Invalid username or password.");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginStatus("An error occurred while logging in.");
      });
  }

  function submitCreateAccount(event) {
    event.preventDefault();
    setLoginStatus("Creating account...");
    // TODO check if the username is unique

    setLoginStatus("Account created!");
    props.handleSubmitCredential(Credential);
  }

  return (
    <div className="background-yellow">
      <div className="GrayRectangle">
        <div className="ListItHeader">ListIt!</div>
        <div className="usernamefield">
          <label htmlFor="username">Username</label>
          <input
            style={{ backgroundColor: "white" }}
            type="text"
            name="username"
            id="username"
            value={Credential.username}
            onChange={handleChange}
          />
        </div>
        <div className="passwordfield">
          <label htmlFor="password">Password</label>
          <input
            style={{ backgroundColor: "white" }}
            type="password"
            name="password"
            id="password"
            value={Credential.password}
            onChange={handleChange}
          />
        </div>
        <input
          className="loginbutton"
          type="button"
          value="Login"
          onClick={(event) => submitLogin(event)}
        />
        <input
          className="passwordbutton"
          type="button"
          value="Create Account"
          onClick={(event) => submitCreateAccount(event)}
        />
        <p>{loginStatus}</p>
      </div>
    </div>
  );
}

export default Login;

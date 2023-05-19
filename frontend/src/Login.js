import React, { useState } from "react";
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
    console.log("Checking Credentials");
    setTimeout(() => {
      console.log(props.isCredentialValid(Credential));
      if (props.isCredentialValid(Credential)) {
        setLoginStatus("Login successful!");
      } else {
        setLoginStatus("Invalid username or password.");
      }
    }, 1500);
  }

  function submitCreateAccount(event) {
    event.preventDefault();
    setLoginStatus("Creating account...");
    // TODO check if the username is unique

    setLoginStatus("Account created!");
    props.handleSubmitCredential(Credential);
  }

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={Credential.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={Credential.password}
        onChange={handleChange}
      />
      <input
        type="button"
        value="Login"
        onClick={(event) => submitLogin(event)}
      />
      <input
        type="button"
        value="Create Account"
        onClick={(event) => submitCreateAccount(event)}
      />
      <p>{loginStatus}</p>
    </div>
  );
}

export default Login;

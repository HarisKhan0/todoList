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

    setTimeout(() => {
      // TODO function to check
      const isLoggedIn =
        Credential.username === "validUser" &&
        Credential.password === "validPassword";

      if (isLoggedIn) {
        setLoginStatus("Login successful!");
        props.handleSubmitCredential(Credential); // TODO change to login handleSubmitLogin
        setCredential({
          username: "",
          password: "",
        });
      } else {
        setLoginStatus("Invalid username or password.");
      }
    }, 1500);
  }

  function submitCreateAccount(event) {
    event.preventDefault();
    setLoginStatus("Creating account...");
    // TODO function to create the account
    // TODO check if the username is unique

    setLoginStatus("Account created!");
    props.handleSubmitCredential(Credential);
    setCredential({
      username: "",
      password: "",
    });
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

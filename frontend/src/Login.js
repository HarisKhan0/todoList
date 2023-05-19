import React, { useState } from "react";
// import { Link } from "react-router-dom";

function Login(props) {
  // Login status object
  const [loginStatus, setLoginStatus] = useState("");

  // Credentials object
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function submitLogin(event) {
    event.preventDefault();
    setLoginStatus("Logging in...");

    setTimeout(() => {
      // TODO function to check
      const isLoggedIn =
        credentials.username === "validUser" &&
        credentials.password === "validPassword";

      if (isLoggedIn) {
        setLoginStatus("Login successful!");
        props.handleSubmitCredential(credentials); // TODO change to login handleSubmitLogin
        setCredentials({
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
    setTimeout(() => {
      // TODO function to create the account
      // TODO check if the username is unique

      setLoginStatus("Account created!");
      props.handleSubmitCredential(credentials);
      setCredentials({
        username: "",
        password: "",
      });
    }, 1500);
  }

  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button onClick={submitLogin}>Login</button>
      <button onClick={submitCreateAccount}>Create Account</button>
      <p>{loginStatus}</p>
    </div>
  );
}

export default Login;

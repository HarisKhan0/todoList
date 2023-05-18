import React, { useState } from "react";
// import { Link } from "react-router-dom";

function Login(props) {
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
    props.handleSubmit(credentials);
    setCredentials({
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
    </div>
  );
}

export default Login;

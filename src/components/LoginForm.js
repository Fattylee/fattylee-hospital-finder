import React, { useState } from "react";

export const LoginForm = (prop) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(true);

  const handleChange = (e) => {
    const { name, value, id, type, checked } = e.target;
    console.log(name, value, id, type, checked);

    if (name === "username") {
      setUsername(value);
      prop.onHandleUsername(value);
    } else if (name === "password") {
      setPassword(value);
      prop.onHandlePassword(value);
    } else if (name === "rememberme") {
      setRememberme(checked);
      prop.onHandleRememberme(checked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    prop.onHandleSubmit(username, password, rememberme);
    const input = e.target.elements;
    // u can get form element by name or id value
    console.log(input["username"]);
    clearForm();
  };

  const clearForm = () => {
    setPassword("");
    setUsername("");
    setRememberme(false);
  };

  return (
    <div>
      <h2>{username}</h2>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          data-testid="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            data-testid="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="rememberme">
          Remember me
          <input
            type="checkbox"
            name="rememberme"
            data-testid="rememberme"
            id="rememberme"
            checked={rememberme}
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

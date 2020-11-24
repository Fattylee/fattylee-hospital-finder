import React, { useState } from "react";

export const LoginForm = (prop) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(true);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // prop.onHandleUsername(username);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // prop.onHandlePassword(password);
  };
  const handleRememberMe = (e) => {
    setRememberme(e.target.checked);
    // prop.onHandleRememberme(rememberme);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // prop.onHandleSubmit(username, password, rememberme);
  };

  return (
    <div>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          data-testid="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
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
            onChange={handleRememberMe}
          />
        </label>
      </form>
    </div>
  );
};

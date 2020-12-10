import { Button, Card, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../actions/auth";

const initialState = {
  identity: "",
  password: "",
};

const Login = (props) => {
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  const {
    errors,
    auth: { isAuthenticated },
  } = useSelector((state) => state);

  if (isAuthenticated) props.history.push("/dashboard");

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(userData, props.history));
  };

  return (
    <>
      <Card
        elevation={10}
        style={{ padding: "20px", maxWidth: "400px", margin: "20px auto" }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Login to your Account
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="false" noValidate>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="identity"
              variant="outlined"
              type="text"
              name="identity"
              placeholder="Enter identity"
              fullWidth
              value={userData.identity}
              onChange={handleChange}
              size="small"
            />
            {errors.identity && (
              <Typography variant="body2" color="secondary">
                {errors.identity}
              </Typography>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="password"
              variant="outlined"
              type="password"
              name="password"
              placeholder="Enter password"
              fullWidth
              value={userData.password}
              onChange={handleChange}
              size="small"
            />
            {errors.password && (
              <Typography variant="body2" color="secondary">
                {errors.password}
              </Typography>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            children="submit"
          />
        </form>
      </Card>
    </>
  );
};

export default Login;

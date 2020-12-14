import { Button, Card, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = (props) => {
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

    dispatch(registerUser(userData, props.history));
  };

  return (
    <>
      <Card
        elevation={10}
        style={{ padding: "20px", maxWidth: "400px", margin: "20px auto" }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Register for a Account
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="username"
              variant="outlined"
              type="text"
              name="username"
              placeholder="Enter username"
              fullWidth
              value={userData.username}
              onChange={handleChange}
              size="small"
            />
            {errors.username && (
              <Typography variant="body2" color="secondary">
                {errors.username}
              </Typography>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="email"
              variant="outlined"
              type="text"
              name="email"
              placeholder="Enter email"
              fullWidth
              value={userData.email}
              onChange={handleChange}
              size="small"
            />
            {errors.email && (
              <Typography variant="body2" color="secondary">
                {errors.email}
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

export default Register;

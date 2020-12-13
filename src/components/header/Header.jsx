import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrClearAuthToken } from "../../utils/api";
import { setCurrentUser } from "../../actions/auth";

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    user: { username },
  } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    localStorage.removeItem("jwtToken");
    setOrClearAuthToken();
    dispatch(setCurrentUser({}));
    window.location.assign("/");
  };
  const authLinks = isAuthenticated && (
    <div>
      <Button variant="text" color="inherit">
        <Link to="/profile" className={classes.link}>
          <Avatar children={username[0]} title="profile" variant="circular" />
        </Link>
      </Button>

      <Button
        variant="text"
        color="inherit"
        className={classes.link}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
  const guestLinks = (
    <div>
      <Button variant="text" color="inherit">
        <Link to="/login" className={classes.link}>
          Login
        </Link>
      </Button>
      <Button variant="text" color="inherit">
        <Link to="/register" className={classes.link}>
          Register
        </Link>
      </Button>
    </div>
  );
  return (
    <div>
      <AppBar
        position="sticky"
        color="transparent"
        style={{ marginBottom: "20px" }}
      >
        <Container>
          <Toolbar className={classes.root}>
            <IconButton aria-label="Menubook icon">
              <Link to={isAuthenticated ? "/products" : "/"}>
                <MenuBook color="action" />
              </Link>
            </IconButton>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;

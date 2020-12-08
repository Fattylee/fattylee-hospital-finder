import React from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const classes = useStyles();
  const {
    isAuthenticated,
    user: { username },
  } = useSelector((state) => state.auth);

  const authLinks = isAuthenticated && (
    <div>
      <Button variant="text" color="inherit">
        <Link to="/dashboard" className={classes.link}>
          dashboard
        </Link>
      </Button>

      <Button variant="text" color="inherit">
        <Link to="/logout" className={classes.link}>
          Logout
        </Link>
      </Button>
    </div>
  );
  const guestLinks = !isAuthenticated && (
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
      <AppBar position="sticky" color="transparent">
        <Container>
          <Toolbar className={classes.root}>
            <IconButton aria-label="Menubook icon">
              <Link to="/">
                <MenuBook color="action" />
              </Link>
            </IconButton>
            {authLinks}
            {guestLinks}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;

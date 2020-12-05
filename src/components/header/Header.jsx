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

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Container>
          <Toolbar className={classes.root}>
            <IconButton aria-label="Menubook icon">
              <Link to="/">
                <MenuBook color="action" />
              </Link>
            </IconButton>
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
              <Button variant="text" color="inherit">
                <Link to="/logout" className={classes.link}>
                  Logout
                </Link>
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

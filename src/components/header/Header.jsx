import React from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";

export const Header = () => {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Container>
          <Toolbar>
            <IconButton
              aria-label="Menubook icon"
              edge=""
              style={{ flexGrow: 0 }}
            >
              <MenuBook />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 4, background: "red" }}>
              News
            </Typography>
            <Button variant="text" color="inherit">
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      ;
    </>
  );
};

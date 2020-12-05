import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createMuiTheme,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  ThemeProvider,
  Typography,
  useTheme,
  Avatar,
  CardMedia,
  Collapse,
} from "@material-ui/core";
import {
  AddShoppingCart,
  CloudUpload,
  KeyboardVoice,
  KeyboardVoiceOutlined,
  LocalConvenienceStore,
  Save,
  SendSharp,
  ShoppingCart,
  MenuOutlined,
  MoreHoriz,
  MoreVert,
} from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";

import img1 from "./thanks.jpeg";

const darkTheme = createMuiTheme({
  palette: {
    // type: "dark",
  },
});
export const MaterialUI = (props) => {
  const [toggleText, setToggleText] = useState(true);
  const useStyles = makeStyles((theme) => ({
    spacing: {
      // margin: "5px",
      margin: theme.spacing(1),
      color: "pink",
      background: "yellow",
    },
    grid: {
      background: "red",
    },
    paper: {
      background: "cyan",
      color: "white",
      padding: "10px",
    },
    super: (p) => ({
      color: p.high ? "gold" : "blue",
    }),
    superP: {
      // background: (f) => (f.high ? "aqua" : "orange"),
      [theme.breakpoints.up("sm")]: {
        background: purple,
      },
    },
  }));

  const classes = useStyles(props);
  const theme = useTheme();
  // console.log(theme);
  const bull = (
    <span
      style={{
        display: "inline-block",
        margin: "0 4px",
        paddingBottom: "11px",
        // marginBottom: "-5px",
        transform: "scale(3.5)",
      }}
    >
      .
    </span>
  );
  return (
    <div>
      <img src={img1} alt="nothig was found" />
      <ThemeProvider theme={darkTheme}>
        <Grid container direction="column">
          <Grid item container justify="space-between">
            <Grid item>
              <IconButton>
                <MenuOutlined color="primary" />
              </IconButton>
            </Grid>
            <Grid item>Logout</Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <Paper>Column 1</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>Column 2</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>Column 3</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>
                <Typography>
                  <Button variant="contained" color="primary" children="abu" />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, molestias!
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>
                <Card elevation={14}>
                  <CardHeader
                    action={
                      <IconButton>
                        <MoreHoriz />
                        <MoreVert />
                      </IconButton>
                    }
                    title="title one"
                    subheader="sub hereder here"
                    avatar={<Avatar>fatai</Avatar>}
                  />
                  <CardMedia
                    style={{
                      // height: "80px",
                      paddingTop: "56.25%",
                    }}
                    image={img1}
                    title="my fishyy"
                  />
                  {/* <Divider /> */}
                  <CardContent>
                    <Typography variant="title1" component="h2" gutterBottom>
                      Word of the day
                    </Typography>
                    <Typography
                      noWrap={toggleText}
                      onClick={() => setToggleText(!toggleText)}
                    >
                      be{bull}ne{bull}vo{bull}lent nice to have description goes
                      down the line. nice to have description goes down the
                      line. nice to have description goes down the line.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button children="edit" variant="contained" />

                    <Button
                      children="submit"
                      variant="contained"
                      color="primary"
                    />
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>Column 1</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" elevation={12}>
              paper 1
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>paper 2</Paper>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item container direction="column" spacing={3}>
            <Grid item xs={6}>
              <Paper style={{ background: "cyan" }}>new 1</Paper>
            </Grid>
            <Grid item>
              <Paper style={{ background: "maroon" }}>new 2</Paper>
            </Grid>
          </Grid>
        </Grid>

        <Button
          className={makeStyles({ tap: { background: "green" } })().tap}
          color="primary"
          variant="contained"
          startIcon={<Save></Save>}
          // startIcon={<Delete />}
          endIcon={<CloudUpload />}
          aria-expanded={true}
        >
          {" "}
          click me
        </Button>
        <Collapse in={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
          corrupti ratione asperiores eaque voluptate quam aut maiores?
          Exercitationem, sequi corrupti? Voluptate impedit esse facilis
          adipisci reprehenderit maxime cumque, reiciendis quae.
        </Collapse>
        <IconButton>
          <LocalConvenienceStore />
        </IconButton>
        <Button
          className={classes.spacing}
          startIcon={<KeyboardVoice />}
          endIcon={<KeyboardVoiceOutlined />}
          variant="contained"
          color="secondary"
        >
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disable
        </Button>
        <Button variant="contained" color="primary" href="#nothing">
          Link
        </Button>
        <Button size="large" variant="outlined" color="primary">
          variant button
        </Button>
        <Button variant="text" color="secondary">
          Text button
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.spacing}
          startIcon={<SendSharp />}
        >
          Send
        </Button>
        <IconButton color="primary" aria-label="shopping-cart">
          <ShoppingCart />
          <AddShoppingCart />
        </IconButton>
        <Typography
          className={classes.super}
          color="error"
          noWrap
          display="inline"
          variant="h4"
        >
          perferendis soluta. hello world
        </Typography>
        <Typography
          className={classes.superP}
          variant="h2"
          component="h3"
          gutterBottom
        >
          h2 component
        </Typography>
        <Typography variant="h4">hello world</Typography>
        <Grid container style={{ flexGro: 3 }} spacing={5}>
          <Grid
            className={classes.grid}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={1}
          >
            <Paper className={classes.paper}>grid 1</Paper>
          </Grid>

          <Grid
            className={classes.grid}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={1}
          >
            <Paper className={classes.paper}>grid 2</Paper>
          </Grid>
          <Grid
            className={classes.grid}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={1}
          >
            <Paper className={classes.paper}>grid 3</Paper>
          </Grid>
          <Grid
            className={classes.grid}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={1}
          >
            <Paper className={classes.paper}>grid 4</Paper>
          </Grid>
          <Grid item spacing={2}>
            <Paper style={{ height: "80px", background: "cyan" }}>
              This is a paper
            </Paper>
            <Paper style={{ height: "80px", background: "cyan" }}>
              This is a paper
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
      ;
    </div>
  );
};

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    [theme.breakpoints.down("sm")]: {
      root: {
        flexDirection: "column-reverse",
      },
    },
  };
});

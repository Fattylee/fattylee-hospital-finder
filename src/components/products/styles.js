import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    reverseOrder: {
      flexDirection: "column-reverse",
    },
  },
}));

import { Typography } from "@material-ui/core";
import React from "react";

export const ErrorDiv = ({ errorField }) => {
  return (
    <>
      {errorField && (
        <Typography variant="body2" color="secondary">
          {errorField}
        </Typography>
      )}
    </>
  );
};

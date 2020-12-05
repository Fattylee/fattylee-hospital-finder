import { Paper, TextField } from "@material-ui/core";
import React from "react";

const AddProduct = () => {
  return (
    <div>
      <form>
        <Paper elevation={10}>
          <TextField
            name="name"
            variant="filled"
            placeholder="name please"
            // fullWidth
            label="creator"
          />
        </Paper>
      </form>
    </div>
  );
};

export default AddProduct;

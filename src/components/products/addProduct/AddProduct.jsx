import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../actions/product";
import { ErrorDiv } from "../../../common/ErrorDiv";

const initialState = { title: "", price: "" };
const AddProduct = () => {
  const [{ title, price }, setProduct] = useState(initialState);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      title,
      price,
    };

    console.log(userData);
    setProduct(initialState);
    dispatch(createProduct(userData));
  };

  const handleChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper elevation={10} style={{ padding: "30px" }}>
          <Typography
            variant="h5"
            children="Add a new product"
            style={{ marginBottom: "20px" }}
            align="center"
          />
          <div style={{ marginBottom: "30px" }}>
            <TextField
              name="title"
              variant="outlined"
              placeholder="Enter name "
              fullWidth
              label="title"
              onChange={handleChange}
              value={title}
            />
            <ErrorDiv errorField={errors.title} />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <TextField
              name="price"
              variant="outlined"
              placeholder="Enter price "
              fullWidth
              label="price"
              onChange={handleChange}
              value={price}
            />
            <ErrorDiv errorField={errors.price} />
            <ErrorDiv errorField={errors.error} />
          </div>
          <Button
            type="submit"
            children="Submit"
            variant="contained"
            size="large"
            fullWidth
            color="primary"
          />
        </Paper>
      </form>
    </div>
  );
};

export { AddProduct };

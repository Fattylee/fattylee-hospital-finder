import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, editProduct } from "../../../actions/product";
import { ErrorDiv } from "../../../common/ErrorDiv";
import FileBase64 from "react-file-base64";
import { useForm } from "./useForm";
import { isEmpty } from "../../../utils/isEmpty";
import { setErrors } from "../../../actions/errors";

const initialState = { title: "", price: "", selectedFile: "" };

const AddProduct = ({ setCurrentId, currentId }) => {
  const [userData, handleChange, setProduct] = useForm(initialState);

  const dispatch = useDispatch();

  const { errors, products } = useSelector((state) => state);

  const product = products?.find((p) => p._id === currentId);

  const titleRef = React.useRef(null);

  React.useEffect(() => {
    if (currentId) {
      dispatch(setErrors({}));
    }
  }, [currentId, dispatch, setCurrentId]);

  React.useEffect(() => {
    titleRef.current.querySelector("input")?.focus();

    if (product) setProduct(product);

    // clear forms only if no currentId and no errors
    isEmpty(errors) && !currentId && setProduct(initialState);
  }, [product, setProduct, errors, currentId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(editProduct(currentId, userData, setCurrentId));
    } else {
      dispatch(createProduct(userData));
    }
  };

  const { title, price } = userData;

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Paper elevation={10} style={{ padding: "30px" }}>
          <Typography
            variant="h5"
            children={currentId ? "Edit product" : "Add a new product"}
            style={{ marginBottom: "20px" }}
            align="center"
          />
          <div style={{ marginBottom: "30px" }}>
            <TextField
              ref={titleRef}
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
          <div style={{ marginBottom: "30px" }}>
            <FileBase64 multiple={false} onDone={handleChange} type="file" />
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

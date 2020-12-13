import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { AddShoppingCart, Delete, Edit, MoreVert } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../actions/product";
import { userStyles } from "./styles";

const Product = ({ product }) => {
  const classes = userStyles();
  const {
    auth: { isAuthenticated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar children={product?.owner?.username || "N"} />}
        title={product.title}
        subheader={product.title}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
      />
      <CardMedia className={classes.img} image={product.img || "kjsjwjs"} />
      <CardContent align="justify">
        <Typography variant="body1">{product.title}</Typography>
        <Typography>{product.price}</Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        {isAuthenticated && (
          <div>
            <Button
              className={classes.space}
              variant="contained"
              color="secondary"
              onClick={handleDeleteProduct.bind(null, product._id)}
            >
              <Delete />
            </Button>
            <Button variant="contained" color="primary">
              <Edit />
            </Button>
          </div>
        )}
        <IconButton aria-label="add shopping cart">
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

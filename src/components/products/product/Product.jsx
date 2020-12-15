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
import moment from "moment";
import { deleteProduct } from "../../../actions/product";
import { userStyles } from "./styles";
// import placeholder from "../../../assets/images/placeholder.jpg";

const Product = ({ product, setCurrentId }) => {
  const classes = userStyles();
  const {
    auth: {
      isAuthenticated,
      user: { userId },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (id) => {
    setCurrentId(id);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label={product?.owner?.username}
            children={product?.owner?.username || "N"}
          />
        }
        title={product.title}
        subheader={moment(product.createdAt).fromNow()}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
      />
      {
        // <img src={placeholder} width="200px" />
        <CardMedia
          className={classes.img}
          // component="img"
          // height="100"
          image={product.selectedFile || "/assets/images/placeholder.jpg"}
        />
      }
      <CardContent align="justify">
        <Typography variant="body1" noWrap>
          {product.title}{" "}
        </Typography>
        <Typography>{product.price}</Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        {isAuthenticated && userId === product?.owner?._id && (
          <div>
            <Button
              className={classes.space}
              variant="contained"
              color="secondary"
              onClick={handleDeleteProduct.bind(null, product._id)}
            >
              <Delete />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit.bind(null, product._id)}
            >
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

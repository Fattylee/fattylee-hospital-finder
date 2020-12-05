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
import { userStyles } from "./styles";

const Product = ({ product }) => {
  const classes = userStyles();
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
      <CardMedia className={classes.img} image={product.img} />
      <CardContent align="justify">
        <Typography variant="body1">{product.title}</Typography>
        <Typography>{product.price}</Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        <div>
          <Button
            className={classes.space}
            variant="contained"
            color="secondary"
          >
            <Delete />
          </Button>
          <Button variant="contained" color="primary">
            <Edit />
          </Button>
        </div>
        <IconButton aria-label="add shopping cart">
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Product from "./product/Product";

import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../actions/product";
import { AddProduct } from "./addProduct/AddProduct";
import { useStyles } from "./styles";
import Axios from "axios";

/**
 * Redux cheatsheet
 * create a reducers, actions, api folders
 * in App Component 'createStore'
 * import {createStore, applyMiddleware, compose} from 'redux'
 * import thunk from 'redux-thunk'
 *
 * const store= createStore(reducers,compose([applyMiddleware(thunk)])
 *
 * wrap App with Provider comp from react-redux
 * import {Provider} from 'react-redux'
 * <Prodiver store={store}>
 *  <App/>
 * </Provider>, getElem....
 *
 * how to dispatch an action
 * import {useDispatch} from 'react-redux'
 * const dispatch= useDispatch()
 *
 * dispatch(actionCreator())
 *
 * actionCreators
 * getPost=(anyValue)=> async dispatch=>{
 *  try{
 *    const {data} = await axios.get('...')
 *    dispatch({type:'GET_ALL_POSTS",payload:data})
 * }catch(){}
 * }
 *
 * accessing state:
 * import {useSelector} from 'react-redux
 * const state= useSelector(state=>state)
 */

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    auth: { isAuthenticated },
  } = useSelector((state) => state);

  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const classes = useStyles();
  const [img, setImg] = useState(null);
  React.useEffect(() => {
    Axios.get("/create")
      .then(({ data }) => {
        // console.log(data);
        const blobImg = new Blob(data);

        setImg(blobImg);
      })
      .catch((error) => {
        console.error(error.response);
      });
  });
  return (
    <Container>
      {products.length ? (
        <>
          <Typography align="center" variant="h3" gutterBottom>
            Products for sales
          </Typography>
          <img src={img} alt="test me" />
          <Grid
            container
            justify="space-between"
            spacing={2}
            className={classes.reverseOrder}
          >
            <Grid container item md={isAuthenticated ? 8 : 12} spacing={2}>
              {products.map((product) => (
                <Grid
                  key={product._id}
                  item
                  xs={12}
                  sm={6}
                  md={isAuthenticated ? 6 : 4}
                  lg={isAuthenticated ? 4 : 3}
                >
                  <Product
                    key={product._id}
                    product={product}
                    setCurrentId={setCurrentId}
                  />
                </Grid>
              ))}
            </Grid>
            {isAuthenticated && (
              <Grid item md={3} xs={12}>
                <AddProduct currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <div
          elevation={20}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            height: "70vh",
            alignItems: "center",
          }}
        >
          <CircularProgress
            color="primary"
            variant="indeterminate"
            size="250px"
            thickness={4}
          />
        </div>
      )}
    </Container>
  );
};

export default Products;

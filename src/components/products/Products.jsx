import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Product from "./product/Product";

import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../actions/product";
import { LocalDining } from "@material-ui/icons";
import { AddProduct } from "./addProduct/AddProduct";

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
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Container>
      {products.length ? (
        <>
          <Typography align="center" variant="h3" gutterBottom>
            Products for sales
          </Typography>
          <Grid container justify="space-between">
            <Grid container item md={8} spacing={2}>
              {products.map((product) => (
                <Grid key={product._id} item xs={12} sm={6} lg={4} xl={3}>
                  <Product key={product._id} product={product} />
                </Grid>
              ))}
            </Grid>
            <Grid item md={3}>
              <AddProduct />
            </Grid>
          </Grid>
        </>
      ) : (
        <LocalDining />
      )}
    </Container>
  );
};

export default Products;

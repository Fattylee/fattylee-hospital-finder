import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Product from "./product/Product";

import img from "../thanks.jpeg";
import { Menu, MenuBook, MenuOpen } from "@material-ui/icons";
import { store } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../actions/posts";

const products = [
  { id: 1, title: "product 1", price: 2, img },
  { id: 2, title: "product 2", price: 21, img },
  { id: 3, title: "product 3", price: 8, img },
];

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
  const products = useSelector((state) => state.posts);

  console.log("=========products========", products);
  useEffect(() => {
    dispatch(fetchPost());
    console.log("==========================useEffect=======================");
  }, [dispatch]);

  console.log(store.getState());
  store.subscribe(() => {
    console.log(store.getState());
  });
  return (
    <div>
      <Paper elevation={10}>
        <TextField
          name="name"
          variant="filled"
          placeholder="name please"
          // fullWidth
          label="creator"
        />
      </Paper>
      <AppBar position="sticky" color="transparent">
        <Container>
          <Toolbar>
            <IconButton
              aria-label="Menubook icon"
              edge=""
              style={{ flexGrow: 0 }}
            >
              <MenuBook />
            </IconButton>
            {/* <IconButton>
            <MenuOpen />
          </IconButton>
          <IconButton>
            <Menu />
          </IconButton> */}
            <Typography variant="h6" style={{ flexGrow: 4, background: "red" }}>
              News
            </Typography>
            <Button variant="text" color="inherit">
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Product key={product._id} product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;

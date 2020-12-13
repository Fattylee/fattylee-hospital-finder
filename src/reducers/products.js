import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
} from "../actions/types";

export const products = (products = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case CREATE_PRODUCT:
      return [action.payload, ...products];
    case DELETE_PRODUCT:
      return products.filter((product) => product._id !== action.payload);

    default:
      return products;
  }
};

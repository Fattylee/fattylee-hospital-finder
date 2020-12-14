import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
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
    case EDIT_PRODUCT:
      return products.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );

    default:
      return products;
  }
};

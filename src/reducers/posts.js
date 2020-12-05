import { FETCH_PRODUCTS } from "../actions/types";

export const products = (products = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;

    default:
      return products;
  }
};

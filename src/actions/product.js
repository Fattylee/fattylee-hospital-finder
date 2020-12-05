import Axios from "axios";
import { FETCH_PRODUCTS } from "./types";

const axios = Axios.create({
  baseURL: "http://localhost:5000/api/v1/products",
});

export const fetchProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("");
    dispatch({ type: FETCH_PRODUCTS, payload: data.products });
  } catch (ex) {
    console.log(ex, "===============from-error-fetchProduct===============");
  }
};

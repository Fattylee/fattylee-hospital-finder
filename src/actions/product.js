import Axios from "axios";
import { setErrors } from "./errors";
import { CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS } from "./types";

const axios = Axios.create({
  baseURL: "/api/v1/products",
});

export const fetchProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("");
    dispatch({ type: FETCH_PRODUCTS, payload: data.products });
    dispatch(setErrors({}));
  } catch (ex) {
    console.log(
      ex.response,
      "===============from-error-fetchProduct==============="
    );
  }
};

export const createProduct = (userData) => async (dispatch) => {
  try {
    const { data } = await Axios.post("/api/v1/products", userData);
    dispatch({ type: CREATE_PRODUCT, payload: data.product });
  } catch (error) {
    dispatch(setErrors(error?.response?.data?.error));
    console.error(error.response.data);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.delete("/api/v1/products/" + id);
    console.log(data);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    dispatch(setErrors({}));
  } catch (error) {
    dispatch(setErrors(error?.response?.data?.error));
  }
};

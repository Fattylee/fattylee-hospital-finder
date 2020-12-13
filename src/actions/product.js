import Axios from "axios";
import { setOrClearAuthToken } from "../utils/api";
import { setErrors } from "./errors";
import { CREATE_PRODUCT, FETCH_PRODUCTS } from "./types";

const axios = Axios.create({
  baseURL: "/api/v1/products",
  // headers: {
  // common: {
  // authorization: localStorage.jwtToken,
  // },
  // },
});

export const fetchProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("");
    dispatch({ type: FETCH_PRODUCTS, payload: data.products });
  } catch (ex) {
    console.log(
      ex.response,
      "===============from-error-fetchProduct==============="
    );
  }
};

export const createProduct = (userData) => async (dispatch) => {
  try {
    // const authorization = localStorage.jwtToken;
    // setOrClearAuthToken();
    const { data } = await axios.post("", userData, {
      // headers: { authorization: "sa" },
    });
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    dispatch(setErrors(error?.response?.data?.error));
    console.error(error.response.data);
  }
};

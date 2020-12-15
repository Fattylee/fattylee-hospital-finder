import Axios from "axios";
import { setErrors } from "./errors";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCTS,
} from "./types";

const axios = Axios.create({
  baseURL: "/api/v1/products",
});

export const fetchProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("", { params: { owner: true } });
    dispatch({ type: FETCH_PRODUCTS, payload: data.products });
    dispatch(setErrors());
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

export const createProduct = (userData) => async (dispatch) => {
  try {
    const { data } = await Axios.post("/api/v1/products?owner", userData);
    dispatch({ type: CREATE_PRODUCT, payload: data.product });
    dispatch(setErrors());

    // clear file inputs
    document.querySelector("input[type='file']").value = "";
  } catch (error) {
    dispatch(setErrors(error?.response?.data?.error));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await Axios.delete("/api/v1/products/" + id);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    dispatch(setErrors());
  } catch (error) {
    dispatch(setErrors(error?.response?.data?.error));
  }
};

export const editProduct = (id, userData, setCurrentId) => async (dispatch) => {
  try {
    const { data } = await Axios.patch(
      `/api/v1/products/${id}?Owner`,
      userData
    );

    dispatch({ type: EDIT_PRODUCT, payload: data.product });
    dispatch(setErrors());
    setCurrentId(null);
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

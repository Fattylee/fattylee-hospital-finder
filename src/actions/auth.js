import { decode } from "jsonwebtoken";
import { setOrClearAuthToken } from "../utils/api";
import { setErrors } from "./errors";
import { SET_CURRENT_USER } from "./types";

const { default: Axios } = require("axios");

const axios = Axios.create({ baseURL: "/api/v1/auth" });

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    const {
      data: { token },
    } = await axios.post("register", userData);

    // redirect to login page
    history.push("/login");
    // clear errors store
    dispatch(setErrors({}));

    // set token to localStorage
    localStorage.setItem("jwtToken", token);

    setOrClearAuthToken(token);

    dispatch(setCurrentUser(decode(token)));
  } catch (ex) {
    console.log(ex.response.data, "====error===");
    dispatch(setErrors(ex.response.data.error));
  }
};

export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("login", userData);
    const { token } = data;
    localStorage.setItem("jwtToken", token);

    setOrClearAuthToken(token);
    dispatch(setErrors({}));
    dispatch(setCurrentUser(decode(token)));
    history.push("/dashboard");
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

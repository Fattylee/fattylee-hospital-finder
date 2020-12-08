import { setErrors } from "./errors";

const { default: Axios } = require("axios");

const axios = Axios.create({ baseURL: "http://localhost:5000/api/v1/auth" });

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("register", userData);
    console.log(data);
    dispatch(setErrors({}));
    history.push("/login");
  } catch (ex) {
    console.log(ex.response.data, "====error===");
    dispatch(setErrors(ex.response.data.error));
  }
};

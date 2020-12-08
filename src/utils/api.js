import Axios from "axios";

export const setOrClearAuthToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
  }
};

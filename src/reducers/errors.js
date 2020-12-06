import { GET_ERRORS } from "../actions/types";

export const errors = (errors = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return errors;
  }
};

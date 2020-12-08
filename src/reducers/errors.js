import { SET_ERRORS } from "../actions/types";

export const errors = (errors = {}, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    default:
      return errors;
  }
};

import { isEmpty } from "../utils/isEmpty";
import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const auth = (auth = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...auth,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return auth;
  }
};

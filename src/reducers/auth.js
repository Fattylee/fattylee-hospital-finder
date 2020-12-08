const initialState = {
  isAuthenticated: false,
  user: {},
};

export const auth = (auth = initialState, action) => {
  switch (action.type) {
    case 0:
      break;

    default:
      return auth;
  }
};

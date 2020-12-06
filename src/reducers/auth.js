const initialState = {
  isAuthenticated: false,
  user: null,
};

export const auth = (auth = initialState, action) => {
  switch (action.type) {
    case 0:
      break;

    default:
      return auth;
  }
};

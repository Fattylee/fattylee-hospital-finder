import { FETCH_POSTS } from "../actions/types";

export const posts = (posts = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;

    default:
      return posts;
  }
};

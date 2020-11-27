import { createStore, combineReducers } from "redux";

const [REMOVE_ITEM, ADD_ITEM, CHANGE_LIST_TITLE] = [
  "REMOVE_ITEM",
  "ADD_ITEM",
  "CHANGE_LIST_TITLE",
];

const red = combineReducers({
  title: titleReducer,
  list: listReducer,
});

const store = createStore(red, {});

function titleReducer(state = "", action) {
  switch (action.type) {
    case CHANGE_LIST_TITLE:
      return action.title || "No Title";
    default:
      return state;
  }
}

function listReducer(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return state.concat({ title: action.title });

    case REMOVE_ITEM:
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
}

function listManagerReducer(state = {}, action) {
  return {
    title: titleReducer(state.title, action),
    list: listReducer(state.list, action),
  };
}

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

store.dispatch({
  type: CHANGE_LIST_TITLE,
  title: "seperate the chaff from the wheat",
});

store.dispatch({ type: ADD_ITEM, title: "fix me" });
store.dispatch({ type: ADD_ITEM, title: "practice till u attain perfection" });

store.dispatch({
  type: CHANGE_LIST_TITLE,
  title: "my superb list",
});

store.dispatch({
  type: REMOVE_ITEM,
  index: 1,
});
// unsubscribe();

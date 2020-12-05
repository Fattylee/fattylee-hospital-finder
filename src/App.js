import React, { Fragment } from "react";
import { Products } from "./components";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Products />
      </Provider>
    </Fragment>
  );
};

export default App;

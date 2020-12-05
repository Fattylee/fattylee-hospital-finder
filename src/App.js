import React, { Fragment } from "react";
import { Header, Landing, Products } from "./components";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/products" component={Products} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;

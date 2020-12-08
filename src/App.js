import React, { Fragment } from "react";
import { Header, Landing, Login, Products, Register } from "./components";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setOrClearAuthToken } from "./utils/api";
import { setCurrentUser } from "./actions/auth";
import { decode } from "jsonwebtoken";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;

  setOrClearAuthToken(token);
  const decoded = decode(token);
  store.dispatch(setCurrentUser(decoded));
}
const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/products" component={Products} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;

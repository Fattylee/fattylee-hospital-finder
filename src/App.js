import React, { Fragment } from "react";
import { Header, Landing, Login, Products, Register } from "./components";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setOrClearAuthToken } from "./utils/api";
import { setCurrentUser } from "./actions/auth";
import { decode } from "jsonwebtoken";
import ProtectedRoute from "./components/ProtectedRoute";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;

  const decoded = decode(token);

  // check fo expired token
  if (Date.now() / 1000 > decoded.exp) {
    localStorage.removeItem("jwtToken");
    window.location.assign("/login");
  }
  setOrClearAuthToken(token);
  store.dispatch(setCurrentUser(decoded));
}

const Dashboard = () => <div>Dashboad protected component</div>;
const Profile = () => <div>Profile protected component</div>;
const NotFound = () => <div>Not Found Page</div>;

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
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;

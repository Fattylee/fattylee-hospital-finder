import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/register",
          state: {
            from: rest.location,
          },
        }}
      />
    );
  }

  return <Route {...rest} component={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;

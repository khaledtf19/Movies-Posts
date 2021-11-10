import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [user, setUser] = useContext(UserContext);

  const isAuthenticated = user ? true : false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;

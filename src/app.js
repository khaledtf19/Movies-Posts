import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/pages/Home";
import Navbar from "./components/layout/Nav";
import Profile from "./components/pages/Profile";
import Posts from "./components/pages/Posts";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./ProtectedRoute";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/posts" exact component={Posts} />
        </Switch>
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;
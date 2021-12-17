import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(selectCurrentUser);
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Redirect to="/" /> : <Component {...rest} />)}
    />
  );
};

export default AuthRoute;

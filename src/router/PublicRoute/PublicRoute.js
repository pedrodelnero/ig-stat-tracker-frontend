import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;

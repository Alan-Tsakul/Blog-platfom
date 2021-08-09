import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './use-auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuth) {
          return <Component {...props} />;
        }
        return <Redirect to="/sign-in" />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default PrivateRoute;

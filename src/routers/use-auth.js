import React, { useState, useContext, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

function useProvideAuth() {
  const [isAuth, setAuth] = useState(false);
  const User = JSON.parse(localStorage.getItem('User'));

  useEffect(() => {
    if (User) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [User]);

  return {
    isAuth,
  };
}

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

ProvideAuth.propTypes = {
  children: PropTypes.objectOf(PropTypes.object).isRequired,
};

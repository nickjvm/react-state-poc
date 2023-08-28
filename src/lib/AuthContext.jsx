import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    // of course this would normally be securely stored token
    // and we'd send the token to our auth service to get the user details
    return Promise.resolve(() => JSON.parse(localStorage.getItem('user')));
  };

  useEffect(() => {
    getUser().then(r => {
      setUser(r);
      setReady(true);
    });
  }, []);

  const validateUser = (user = {}) => {
    let errors = {};
    if (!user.username) {
      errors.username = 'Required';
    }
    if (!user.password) {
      errors.password = 'Required';
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(errors).length ? errors : false;
  };

  const createUser = async (user) => {
    const errors = validateUser(user);
    if (errors) {
      return Promise.reject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR' ,
          details: errors,
        },
      });
    }

    setLoading(true);
    return fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username.trim(),
        // for this demo, we're not going to send a password over the wire to a mock API
        // password: user.password,
      }),
    })
      .then(r => r.json())
      .then(r => {
        setUser(r);
        localStorage.setItem('user', JSON.stringify(r));
        return {
          success: true,
          user: r,
        };
      }).catch(error => {
        throw {
          success: false,
          error: {
            code: 'FAILED',
            details: error.message,
          },
        };
      }).finally(() => {
        setLoading(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      loading,
      user,
      ready,
      createUser,
      signOut,
    }}
    >{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);

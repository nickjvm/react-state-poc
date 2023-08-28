import React, { useState } from 'react';

import UserProfile from '@/components/molecules/UserProfile';
import SignUp from '@/components/molecules/SignUp';

import './App.scss';

export default function App() {
  const [user, setUser] = useState(null);

  const createUser = async (user) => {
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
      });
  };

  if (!user) {
    return <SignUp createUser={createUser} />;
  } else {
    return <UserProfile user={user} />;
  }
}
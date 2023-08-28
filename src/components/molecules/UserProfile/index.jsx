import React from 'react';
import { useAuth } from '@/lib/AuthContext';

import Button from '@/components/atoms/Button';

export default function UserProfile() {
  const { user, signOut } = useAuth();

  return (
    <div className="container">
      <h1>Hello {user.username}!</h1>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
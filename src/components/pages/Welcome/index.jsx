import React from 'react';
import { useAuth } from '@/lib/AuthContext';

import UserProfile from '@/components/molecules/UserProfile';
import SignUp from '@/components/molecules/SignUp';

export default function Welcome() {
  const { ready, user } = useAuth();

  if (!ready) {
    return null;
  }

  if (!user) {
    return <SignUp />;
  }

  return <UserProfile />;
}
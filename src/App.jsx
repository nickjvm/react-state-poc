import React from 'react';
import AuthContextProvider from '@/lib/AuthContext';

import Welcome from '@/components/pages/Welcome';

import './App.scss';

function App() {
  return (
    <AuthContextProvider>
      <Welcome />
    </AuthContextProvider>
  );
}

export default App;
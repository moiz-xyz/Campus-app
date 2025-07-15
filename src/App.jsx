import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing/Router';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider> 
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

// src/AppRouter.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import App from './pages/App';

export const AppRoutes = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsSignedIn(!!user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={isSignedIn ? <App /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isSignedIn ? <Login /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

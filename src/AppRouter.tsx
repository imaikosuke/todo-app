// src/AppRouter.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import App from './pages/App';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import Sidebar from './pages/Sidebar/Sidebar';
import Category from './pages/Category';

export const AppRoutes = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [categories, setCategorys] = useState<string[]>(['仕事', '遊び', 'その他']);

  const onAddCategory = (category: string) => {
    setCategorys((prev) => [...prev, category]);
  };

  const onDeleteCategory = (category: string) => {
    setCategorys((prev) => prev.filter((cat) => cat !== category));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsSignedIn(!!user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar isSignedIn={isSignedIn} />
        <Routes>
          <Route
            path="/"
            element={isSignedIn ? <App categories={categories} /> : <Navigate to="/login" />}
          />
          <Route
            path="/category"
            element={
              isSignedIn ? (
                <Category
                  categories={categories}
                  onAddCategory={onAddCategory}
                  onDeleteCategory={onDeleteCategory}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={!isSignedIn ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;

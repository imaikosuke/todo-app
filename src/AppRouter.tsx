// src/AppRouter.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import Login from './pages/Login/Login';
import App from './pages/App';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import Sidebar from './pages/Sidebar/Sidebar';
import Category from './pages/Category/Category';
import Calendar from './pages/Calendar/Calendar';

export const AppRoutes = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [categories, setCategorys] = useState<string[]>(['仕事', '遊び', 'その他']);

  const onAddCategory = async (category: string) => {
    const newCategories = [...categories, category];
    setCategorys(newCategories);
    await setDoc(doc(db, 'categories', 'userCategories'), { list: newCategories });
  };

  const onDeleteCategory = async (category: string) => {
    const newCategories = categories.filter((cat) => cat !== category);
    setCategorys(newCategories);
    await setDoc(doc(db, 'categories', 'userCategories'), { list: newCategories });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      setIsSignedIn(!!user);
      if (user) {
        const docSnap = await getDoc(doc(db, 'categories', 'userCategories'));
        if (docSnap.exists()) {
          setCategorys(docSnap.data().list);
        }
      }
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
          <Route path="/calendar" element={isSignedIn ? <Calendar /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isSignedIn ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;

// src/AppRouter.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import auth, { db } from './firebase';
import Login from './pages/Login/Login';
import App from './pages/App';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import Sidebar from './pages/Sidebar/Sidebar';
import Category from './pages/Category/Category';
import Calendar from './pages/Calendar/Calendar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Todo } from './interface';

export const AppRoutes = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user] = useAuthState(auth);
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

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArray = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Todo)
      );
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar isSignedIn={isSignedIn} />
        <Routes>
          <Route
            path="/"
            element={isSignedIn ? <App todos={todos} categories={categories} /> : <Navigate to="/login" />}
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
          <Route path="/calendar" element={isSignedIn ? <Calendar todos={todos} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isSignedIn ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppRoutes;

// src/pages/App.tsx
import React, { useState } from 'react';
import { AddToDo } from '../components/AddToDo';
import { ToDoList } from '../components/ToDoList';
import { CategoryManagement } from '../components/CategoryManagement';
import Header from './Header/Header';

const App: React.FC = () => {
  const [categories, setCategorys] = useState<string[]>(['仕事', '個人']);

  const addCategory = (category: string) => {
    setCategorys((prev) => [...prev, category]);
  };

  const deleteCategory = (category: string) => {
    setCategorys((prev) => prev.filter((cat) => cat !== category));
  };

  return (
    <>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <AddToDo categories={categories} />
        <CategoryManagement
          categories={categories}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
        />
        <h2 className="mt-4 text-xl font-bold mb-2">タスク</h2>
        <ToDoList />
      </div>
    </>
  );
};

export default App;

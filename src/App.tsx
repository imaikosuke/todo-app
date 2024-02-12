import React, { useState } from 'react';
import { AddToDo } from './components/AddToDo';
import { ToDoList } from './components/ToDoList';
import { CategoryManagement } from './components/CategoryManagement';

const App: React.FC = () => {
  const [categories, setCategorys] = useState<string[]>(['仕事', '個人']);

  const addCategory = (category: string) => {
    setCategorys((prev) => [...prev, category]);
  };

  const deleteCategory = (category: string) => {
    setCategorys((prev) => prev.filter((cat) => cat !== category));
  };

  return (
    <div>
      <h1>ToDoリスト</h1>
      <AddToDo categories={categories} />
      <CategoryManagement
        categories={categories}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />
      <h2>タスク</h2>
      <ToDoList />
    </div>
  );
};

export default App;

// src/pages/App.tsx
import React from 'react';
import { AddToDo } from '../components/AddToDo';
import { ToDoList } from '../components/ToDoList';

interface AppProps {
  categories: string[];
}

const App: React.FC<AppProps> = ({ categories }) => {
  return (
    <>
      <div className="p-4 bg-gray-100 min-h-screen flex-grow">
        <h2 className="pb-4 mt-4 text-xl font-bold mb-2">タスク一覧</h2>
        <AddToDo categories={categories} />
        <ToDoList />
      </div>
    </>
  );
};

export default App;

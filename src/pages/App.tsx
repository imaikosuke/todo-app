// src/pages/App.tsx
import React from 'react';
import { AddToDo } from '../components/AddToDo';
import { ToDoList } from '../components/ToDoList';

interface AppProps {
  categories: string[];
}

const App: React.FC<AppProps> = ({ categories }) => {
  return (
    <div className="p-4 border shadow-sm bg-gray-100 flex-grow">
      <h2 className="pb-4 mt-4 text-xl font-bold mb-2">タスク一覧</h2>
      <div className="mb-5">
        <AddToDo categories={categories} />
      </div>
      <div className="h-[55vh] overflow-auto">
        <ToDoList />
      </div>
    </div>
  );
};

export default App;

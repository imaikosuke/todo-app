// src/pages/App.tsx
import React from 'react';
import { AddToDo } from '../components/AddToDo';
import { ToDoList } from '../components/ToDoList';
import { Todo } from '@/interface';

interface AppProps {
  todos: Todo[];
  categories: string[];
}

const App: React.FC<AppProps> = ({ todos, categories }) => {
  return (
    <div className="p-4 border shadow-sm bg-gray-100 flex-grow">
      <h2 className="text-2xl pb-4 mt-4 font-bold mb-2">タスク一覧</h2>
      <div className="mb-5">
        <AddToDo categories={categories} />
      </div>
      <div>
        <ToDoList todos={todos} />
      </div>
    </div>
  );
};

export default App;

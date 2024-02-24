// src/components/TodoList.tsx
import { ToDoItem } from './ToDoItem';
import { Todo } from '../interface';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React from 'react';

interface ToDoListProps {
  todos: Todo[];
}

export const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
  const onToggleCompleted = async (id: string) => {
    const todoRef = doc(db, 'todos', id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await updateDoc(todoRef, { completed: !todo.completed });
    }
  };

  const onDelete = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 text-center p-4 bg-gray-200 rounded-t-lg">
        <span className="font-bold">タスク名</span>
        <span className="font-bold">カテゴリー</span>
        <span className="font-bold">期日</span>
        <span className="font-bold">操作</span>
      </div>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} onToggleCompleted={onToggleCompleted} onDelete={onDelete} />
      ))}
    </div>
  );
};

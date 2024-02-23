// src/components/AddTodo.tsx
import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import auth from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type AddToDoProps = {
  categories: string[];
};

const addTodoToFirestore = async (title: string, category: string, dueDate: Date, userId: string) => {
  await addDoc(collection(db, 'todos'), {
    title,
    completed: false,
    category,
    dueDate,
    userId,
    createdAt: serverTimestamp(),
  });
};

export const AddToDo: React.FC<AddToDoProps> = ({ categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [user] = useAuthState(auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !user || !dueDate) return;
    await addTodoToFirestore(title, category, dueDate, user.uid);
    setTitle('');
    setCategory('');
    setDueDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスク名"
          className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">カテゴリーを選択</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="flex-1">
          <DatePicker
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            dateFormat="yyyy/MM/dd"
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="期日を選択"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 py-2 px-3 rounded-md bg-blue-500 text-white w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        タスクを追加
      </button>
    </form>
  );  
};

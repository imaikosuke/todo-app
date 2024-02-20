// src/components/AddTodo.tsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import auth from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type AddToDoProps = {
  categories: string[];
};

const addTodoToFirestore = async (title: string, category: string, userId: string) => {
  await addDoc(collection(db, 'todos'), {
    title,
    completed: false,
    category,
    userId,
    createdAt: serverTimestamp(),
  });
};

export const AddToDo: React.FC<AddToDoProps> = ({ categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [user] = useAuthState(auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !user) return;
    await addTodoToFirestore(title, category, user.uid);
    setTitle('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-sm bg-white">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスク名"
        className="border p-2 rounded-md w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-2 border p-2 rounded-md w-full"
      >
        <option value="">カテゴリーを選択</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit" className="mt-2 py-1 px-3 rounded-md bg-blue-500 text-white w-full">
        タスクを追加
      </button>
    </form>
  );
};

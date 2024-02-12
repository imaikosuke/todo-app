import React, { useState } from 'react';
// import { Todo } from '../interface';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスク名"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">カテゴリーを選択</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">追加</button>
    </form>
  );
};

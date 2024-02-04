import React, { useState } from 'react';
import { Todo } from '../interface';

type AddToDoProps = {
  onAdd: (todo: Todo) => void;
  categories: string[];
};

export const AddToDo: React.FC<AddToDoProps> = ({ onAdd, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) return;
    onAdd({ id: Date.now(), title, completed: false, category });
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

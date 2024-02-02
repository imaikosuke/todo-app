import React, { useState } from 'react';
import { Todo } from '../interface';

export const AddToDo: React.FC<{ onAdd: (todo: Todo) => void }> = ({ onAdd }) => {
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
        <option value="work">仕事</option>
        <option value="private">個人</option>
        // ここに他のカテゴリーオプションを追加
      </select>
      <button type="submit">追加</button>
    </form>
  );
};

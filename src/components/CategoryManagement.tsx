// src/components/CategoryManagement.tsx

import React, { useState } from 'react';

type Props = {
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
};

export const CategoryManagement: React.FC<Props> = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    onAddCategory(newCategory);
    setNewCategory('');
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="新しいカテゴリー"
        className="border p-2 rounded-md w-full"
      />
      <button onClick={handleAdd} className="mt-2 py-1 px-3 rounded-md bg-blue-500 text-white w-full">
        カテゴリーを追加
      </button>
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li key={category} className="flex justify-between items-center border p-2 rounded-md">
            <span>{category}</span>
            <button
              onClick={() => onDeleteCategory(category)}
              className="py-1 px-3 rounded-md bg-red-500 text-white"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

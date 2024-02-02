// CategoryManagement.tsx

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
    setNewCategory(''); // 入力フィールドをクリア
  };

  return (
    <div>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="新しいカテゴリー"
      />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category} <button onClick={() => onDeleteCategory(category)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

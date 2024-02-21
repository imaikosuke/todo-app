// src/pages/Category.tsx

import { useState } from 'react';

interface CategoryProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [warning, setWarning] = useState('');

  const handleAdd = () => {
    if (newCategory.trim() === '') {
      setWarning('カテゴリー名を入力してください');
      return;
    }
    if (categories.includes(newCategory)) {
      setWarning('このカテゴリーは既に存在します');
      return;
    }
    onAddCategory(newCategory);
    setNewCategory('');
  };

  return (
    <div className="p-4 border shadow-sm bg-gray-100 flex-grow">
      <h2 className="pb-4 mt-4 text-xl font-bold mb-2">カテゴリ一覧</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="新しいカテゴリー"
        className="border p-2 rounded-md w-full"
      />
      {warning && <p className="text-red-500 mt-2">{warning}</p>}
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

export default Category;

// src/components/TodoItem.tsx
import React, { useState } from 'react';
import { Todo } from '../interface';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

type ToDoItemProps = {
  todo: Todo;
  onToggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
};

export const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onToggleCompleted, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = async (newTitle: string) => {
    if (isEditing) {
      const todoRef = doc(db, 'todos', todo.id);
      await updateDoc(todoRef, { title: newTitle });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const formattedDueDate = todo.dueDate ? format(todo.dueDate.toDate(), 'yyyy/MM/dd') : '';

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-2">
      <div className="grid grid-cols-4 w-full text-center">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleChange}
            className="col-span-3 border p-2 rounded-md mr-2"
            autoFocus
          />
        ) : (
          <>
            <span className="text-lg font-bold text-gray-800">{todo.title}</span>
            <span className="text-lg font-bold text-gray-800">{todo.category || 'None'}</span>
            <span className="text-lg font-bold text-gray-800">{formattedDueDate}</span>
          </>
        )}
        <div className="flex justify-center items-center space-x-1">
          <button
            onClick={() => onToggleCompleted(todo.id)}
            className={`px-3 py-1 text-white rounded ${todo.completed ? 'bg-green-400' : 'bg-blue-500'}`}
            disabled={isEditing}
          >
            {todo.completed ? '未完了' : '完了'}
          </button>
          {!todo.completed && (
            <button
              onClick={() => handleEdit(editText)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              {isEditing ? '保存' : '編集'}
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
            disabled={isEditing}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

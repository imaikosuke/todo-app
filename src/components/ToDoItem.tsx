import React, { useState } from 'react';
import { Todo } from '../interface';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

  return (
    <div>
      {isEditing ? (
        <input type="text" value={editText} onChange={(e) => handleChange(e)} />
      ) : (
        <span>
          {todo.title} - {todo.category || 'None'}
        </span>
      )}
      <button onClick={() => onToggleCompleted(todo.id)} disabled={isEditing}>
        {todo.completed ? '未完了' : '完了'}
      </button>
      {!todo.completed && (
        <button onClick={() => handleEdit(editText)}>{isEditing ? '保存' : '編集'}</button>
      )}
      <button onClick={() => onDelete(todo.id)} disabled={isEditing}>
        削除
      </button>
    </div>
  );
};

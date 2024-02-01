import React, { useState } from 'react';
import { Todo } from '../interface';

type ToDoItemProps = {
  todo: Todo;
  onToggleCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  onToggleCompleted,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <input type="text" value={editText} onChange={handleChange} />
      ) : (
        <span>{todo.title}</span>
      )}
      <button onClick={() => onToggleCompleted(todo.id)} disabled={isEditing}>
        {todo.completed ? '未完了' : '完了'}
      </button>
      {!todo.completed && <button onClick={handleEdit}>{isEditing ? '保存' : '編集'}</button>}
      <button onClick={() => onDelete(todo.id)} disabled={isEditing}>
        削除
      </button>
    </div>
  );
};

import React from 'react';
import { ToDoItem } from './ToDoItem';
import { Todo } from '../interface';

type ToDoListProps = {
  todos: Todo[];
  onToggleCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  onToggleCompleted,
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

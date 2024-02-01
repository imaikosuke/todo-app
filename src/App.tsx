import React, { useState } from 'react';
import { AddToDo } from './components/AddToDo';
import { ToDoList } from './components/ToDoList';
import { Todo } from './interface';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    if (title == '') return;
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = (id: number) => {
    // 完了状態が切り替わったタスクを見つける
    const targetTodo =
      todos.find((todo) => todo.id === id) || completedTodos.find((todo) => todo.id === id);
    if (!targetTodo) return; // タスクが見つからない場合は何もしない

    const updatedTodo = { ...targetTodo, completed: !targetTodo.completed };

    // 完了状態を反転させ、適切なリストに移動する
    if (updatedTodo.completed) {
      setTodos(todos.filter((todo) => todo.id !== id));
      setCompletedTodos([...completedTodos, updatedTodo]);
    } else {
      setTodos([...todos, updatedTodo]);
      setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };

  return (
    <div>
      <h1>ToDoリスト</h1>
      <AddToDo onAdd={addTodo} />
      <h2>未完了のタスク</h2>
      <ToDoList
        todos={todos}
        onToggleCompleted={toggleCompleted}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      <h2>完了したタスク</h2>
      <ToDoList
        todos={completedTodos}
        onToggleCompleted={toggleCompleted}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
};

export default App;

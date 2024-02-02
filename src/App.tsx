import React, { useState } from 'react';
import { AddToDo } from './components/AddToDo';
import { ToDoList } from './components/ToDoList';
import { Todo } from './interface';
import { CategoryManagement } from './components/CategoryManagement';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [categories, setCategorys] = useState<string[]>(['仕事', '個人']);

  const addTodo = (newTodo: Todo) => {
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

  const addCategory = (category: string) => {
    setCategorys((prev) => [...prev, category]);
  };

  const deleteCategory = (category: string) => {
    setCategorys((prev) => prev.filter((cat) => cat !== category));
  };

  return (
    <div>
      <h1>ToDoリスト</h1>
      <AddToDo onAdd={addTodo} categories={categories}/>
      <CategoryManagement 
        categories={categories}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />
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

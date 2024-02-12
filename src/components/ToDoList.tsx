import { useEffect, useState } from 'react';
import { ToDoItem } from './ToDoItem';
import { Todo } from '../interface';
import { auth, db } from '../firebase';
import { collection, doc, query, where, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArray = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Todo)
      );
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, [user]);

  const onToggleCompleted = async (id: string) => {
    // ToDoの完了状態を切り替える
    const todoRef = doc(db, 'todos', id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await updateDoc(todoRef, { completed: !todo.completed });
    }
  };

  const onDelete = async (id: string) => {
    // ToDoを削除する
    await deleteDoc(doc(db, 'todos', id));
  };

  // const onEdit = async (id: string, newTitle: string) => {
  //   const todoRef = doc(db, 'todos', id);
  //   await updateDoc(todoRef, { title: newTitle });
  // };

  return (
    <div>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={() => onToggleCompleted(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
};

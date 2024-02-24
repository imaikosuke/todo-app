// src/components/ToDoItem.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoItem } from './ToDoItem';
import { Timestamp } from 'firebase/firestore';

jest.mock('../firebase', () => ({
  auth: jest.fn(),
  provider: jest.fn(),
}));

describe('ToDoItem', () => {
  const mockOnToggleCompleted = jest.fn();
  const mockOnDelete = jest.fn();
  const todo = {
    id: '1',
    title: 'テストタスク',
    completed: false,
    category: '仕事',
    dueDate: Timestamp.fromDate(new Date()),
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    render(<ToDoItem todo={todo} onToggleCompleted={mockOnToggleCompleted} onDelete={mockOnDelete} />);
  });

  test('タスクのタイトル、カテゴリー、期日が表示される', () => {
    const taskTitle = screen.getByText(todo.title);
    const taskCategory = screen.getByText(todo.category);
    const taskDueDate = screen.getByText(
      todo.dueDate
        .toDate()
        .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }) // 余りを0埋め
    );
    expect(taskTitle).toBeInTheDocument();
    expect(taskCategory).toBeInTheDocument();
    expect(taskDueDate).toBeInTheDocument();
  });

  test('完了ボタンをクリックするとonToggleCompletedが呼び出される', () => {
    const completeButton = screen.getByRole('button', { name: /完了/i });
    fireEvent.click(completeButton);
    expect(mockOnToggleCompleted).toHaveBeenCalledWith(todo.id);
  });

  test('削除ボタンをクリックするとonDeleteが呼び出される', () => {
    const deleteButton = screen.getByRole('button', { name: /削除/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(todo.id);
  });
});

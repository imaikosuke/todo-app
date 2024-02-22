// src/components/ToDoItem.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoItem } from './ToDoItem';

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
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    render(<ToDoItem todo={todo} onToggleCompleted={mockOnToggleCompleted} onDelete={mockOnDelete} />);
  });

  test('タスクのタイトルとカテゴリーが表示される', () => {
    const taskTitle = screen.getByText('テストタスク - 仕事');
    expect(taskTitle).toBeInTheDocument();
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

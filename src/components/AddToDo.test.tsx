// src/components/AddToDo.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { AddToDo } from './AddToDo';
import { act } from 'react-dom/test-utils';

jest.mock('../firebase', () => ({
  auth: jest.fn(),
  provider: jest.fn(),
}));

// 'react-firebase-hooks/auth'をモック化
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{ uid: 'testUid' }, false, undefined],
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => ({
    add: jest.fn(),
  })),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

describe('AddToDo', () => {
  const categories = ['仕事', '遊び', 'その他'];

  beforeEach(() => {
    render(<AddToDo categories={categories} />);
  });

  test('入力フィールドとカテゴリー選択が表示される', () => {
    const inputField = screen.getByRole('textbox', { name: '' });
    const selectField = screen.getByRole('combobox', { name: '' });
    expect(inputField).toBeInTheDocument();
    expect(selectField).toBeInTheDocument();
  });

  test('カテゴリー選択には指定されたカテゴリーが表示される', () => {
    categories.forEach((category) => {
      const option = screen.getByRole('option', { name: category });
      expect(option).toBeInTheDocument();
    });
  });

  test('タスクを追加ボタンが表示される', () => {
    const addButton = screen.getByRole('button', { name: 'タスクを追加' });
    expect(addButton).toBeInTheDocument();
  });

  test('入力フィールドに入力し、カテゴリーを選択し、タスクを追加ボタンをクリックすると、入力フィールドとカテゴリー選択がクリアされる', async () => {
    const inputField = screen.getByRole('textbox', { name: '' });
    const selectField = screen.getByRole('combobox', { name: '' });
    const addButton = screen.getByRole('button', { name: 'タスクを追加' });

    fireEvent.change(inputField, { target: { value: '新しいタスク' } });
    fireEvent.change(selectField, { target: { value: '仕事' } });

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(inputField).toHaveValue('');
    expect(selectField).toHaveValue('');
  });
});

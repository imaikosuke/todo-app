// src/pages/Category.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import Category from './Category';

describe('Category', () => {
  const mockOnAddCategory = jest.fn();
  const mockOnDeleteCategory = jest.fn();

  beforeEach(() => {
    render(
      <Category
        categories={['仕事', '遊び', 'その他']}
        onAddCategory={mockOnAddCategory}
        onDeleteCategory={mockOnDeleteCategory}
      />
    );
  });

  test('新しいカテゴリーを追加する', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /カテゴリーを追加/i });

    fireEvent.change(input, { target: { value: '新しいカテゴリー' } });
    fireEvent.click(button);

    expect(mockOnAddCategory).toHaveBeenCalledWith('新しいカテゴリー');
  });

  test('既にあるカテゴリーを削除したときに、カテゴリ一覧から消える', () => {
    const deleteButton = screen.getAllByRole('button', { name: /削除/i })[0];

    fireEvent.click(deleteButton);

    expect(mockOnDeleteCategory).toHaveBeenCalledWith('仕事');
  });

  describe('カテゴリー追加のエラーハンドリングのテスト', () => {
    test('空のカテゴリー名を追加しようとすると警告が表示される', () => {
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /カテゴリーを追加/i });

      fireEvent.change(input, { target: { value: ' ' } });
      fireEvent.click(button);

      const warning = screen.getByText('カテゴリー名を入力してください');
      expect(warning).toBeInTheDocument();
    });

    test('既に存在するカテゴリー名を追加しようとすると警告が表示される', () => {
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /カテゴリーを追加/i });

      fireEvent.change(input, { target: { value: '仕事' } });
      fireEvent.click(button);

      const warning = screen.getByText('このカテゴリーは既に存在します');
      expect(warning).toBeInTheDocument();
    });
  });
});

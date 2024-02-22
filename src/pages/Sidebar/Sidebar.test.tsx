// src/pages/Sidebar/Sidebar.test.tsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Sidebar from './Sidebar';

describe('ログインしている場合のSidebar', () => {
  beforeEach(() => {
    render(
      <Router>
        <Sidebar isSignedIn={true} />
      </Router>
    );
  });

  test('ログアウトボタンが表示されている', () => {
    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    expect(logoutButton).toBeInTheDocument();
  });
});

describe('ログインしていない場合のSidebar', () => {
  beforeEach(() => {
    render(
      <Router>
        <Sidebar isSignedIn={false} />
      </Router>
    );
  });

  test('タイトル「Menu」が表示されている', () => {
    const title = screen.getByRole('heading', { name: 'Menu', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('タスク一覧とカテゴリ一覧のリンクが表示されている', () => {
    const taskLink = screen.getByRole('link', { name: 'タスク一覧' });
    const categoryLink = screen.getByRole('link', { name: 'カテゴリ一覧' });
    expect(taskLink).toBeInTheDocument();
    expect(categoryLink).toBeInTheDocument();
  });

  test('タスク一覧をクリックすると、タスク一覧ページに遷移する', async () => {
    const taskLink = screen.getByRole('link', { name: 'タスク一覧' });
    await userEvent.click(taskLink);
    expect(window.location.pathname).toBe('/');
  });

  test('カテゴリ一覧をクリックすると、カテゴリ一覧ページに遷移する', async () => {
    const categoryLink = screen.getByRole('link', { name: 'カテゴリ一覧' });
    await userEvent.click(categoryLink);
    expect(window.location.pathname).toBe('/category');
  });

  test('ログインしていない場合、ログアウトボタンが表示されていない', () => {
    const logoutButton = screen.queryByRole('button');
    expect(logoutButton).not.toBeInTheDocument();
  });
});

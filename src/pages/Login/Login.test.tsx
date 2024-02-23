// src/pages/Login.test.tsx

import { render, screen } from '@testing-library/react';
import Login from './Login';

jest.mock('../../firebase', () => ({
  auth: jest.fn(),
  provider: jest.fn(),
}));

describe('Login画面のテスト', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('Todoリストというタイトルがある', () => {
    const title = screen.getByRole('heading', { name: 'Todoリスト' });
    expect(title).toBeInTheDocument();
  });
  
  test('始めるにはGoogleアカウントによるログインが必要です。というテキストがある', () => {
    const text = screen.getByText('始めるにはGoogleアカウントによるログインが必要です。');
    expect(text).toBeInTheDocument();
  });
  
  test('Googleアカウントでログインというボタンがある', () => {
    const loginButton = screen.getByRole('button', { name: 'Googleアカウントでログイン' });
    expect(loginButton).toBeInTheDocument();
  });
});
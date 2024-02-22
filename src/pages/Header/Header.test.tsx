// src/pages/Header/Header.test.tsx

import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');
jest.mock('@/firebase', () => ({
  auth: jest.fn(),
  initializeApp: jest.fn(),
}));

describe('ログインしている場合のHeader', () => {
  const userAuthenticated = {
    email: 'test@gmail.com',
    photoURL: 'https://example.com/photo.jpg',
  };

  test('メールアドレスとアイコンが表示されている', () => {
    (useAuthState as jest.Mock).mockReturnValue([userAuthenticated]);
    render(<Header />);
    const userEmail = screen.getByText(userAuthenticated.email);
    const userIcon = screen.getByAltText('Googleアカウントのアイコン');
    
    expect(userEmail).toBeInTheDocument();
    expect(userIcon).toHaveAttribute('src', userAuthenticated.photoURL);
  });
});

describe('ログインしていない場合のHeader', () => {
  const userUnauthenticated = null;

  test('タイトル「Todoリスト」が表示されている', () => {
    (useAuthState as jest.Mock).mockReturnValue([userUnauthenticated]);
    render(<Header />);
    const title = screen.getByText('Todoリスト');
    
    expect(title).toBeInTheDocument();
  });

  test('メールアドレスとアイコンが表示されていない', () => {
    (useAuthState as jest.Mock).mockReturnValue([userUnauthenticated]);
    render(<Header />);
    const userEmail = screen.queryByText(/@/);
    const userIcon = screen.queryByAltText('Googleアカウントのアイコン');
    
    expect(userEmail).not.toBeInTheDocument();
    expect(userIcon).not.toBeInTheDocument();
  });
});

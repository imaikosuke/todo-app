// src/pages/Footer/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('"© 2024 Todoリスト by Imai Kosuke"というテキストがあること', () => {
    const copyrightText = screen.getByText('© 2024 Todoリスト by Imai Kosuke');
    expect(copyrightText).toBeInTheDocument();
  });

  test('"GitHubリポジトリ"というリンクがあり、クリックすることで新しいタブでリンクが開くこと', () => {
    const githubLink = screen.getByRole('link', { name: 'GitHubリポジトリ' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/imaikosuke/todo-app');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });
});
import { render, fireEvent, screen } from '@testing-library/react';
import Calendar from './Calendar';
import { Todo } from '../../interface';


describe('Calendar Component', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      createdAt: '2023-04-01T12:00:00.000Z',
      title: 'Task 1',
      completed: false,
    },
    {
      id: '2',
      createdAt: '2023-04-01T12:30:00.000Z',
      title: 'Task 2',
      completed: true,
    },
    {
      id: '3',
      createdAt: '2023-04-02T13:00:00.000Z',
      title: 'Task 3',
      completed: false,
    }
  ];

  beforeEach(() => {
    // コンポーネントをレンダリング
    render(<Calendar todos={mockTodos} />);
  });

  test('正しい日付と曜日が表示される', () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // 現在の月と年が表示されているか確認
    expect(screen.getByText(`${currentYear}年 ${currentMonth + 1}月`)).toBeInTheDocument();

    // 曜日のヘッダーが存在するか確認
    ['日', '月', '火', '水', '木', '金', '土'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('月のナビゲーションが正しく機能する', () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const nextMonthButton = screen.getByText('次の月 ＞');
    const prevMonthButton = screen.getByText('＜ 前の月');

    // 次の月へ移動
    fireEvent.click(nextMonthButton);
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    expect(screen.getByText(`${nextMonth.getFullYear()}年 ${nextMonth.getMonth() + 1}月`)).toBeInTheDocument();

    // 前の月へ移動
    fireEvent.click(prevMonthButton);
    expect(screen.getByText(`${currentYear}年 ${currentMonth + 1}月`)).toBeInTheDocument();
  });
});

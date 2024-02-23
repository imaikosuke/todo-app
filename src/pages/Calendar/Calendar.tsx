import React, { useState } from 'react';

// Todoインターフェースのインポート
import { Todo } from '../../interface';

// テスト用のTodoリスト
const todos: Todo[] = [
  { id: '1', createdAt: '2023-02-01', title: 'タスク1', completed: false, dueDate: '2024-02-15' },
  { id: '2', createdAt: '2023-02-02', title: 'タスク2', completed: false, dueDate: '2024-02-18' },
];

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const generateCalendarDays = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // 前月の日付で埋める
  const prevMonthDays = Array.from({ length: firstDayOfMonth })
    .map((_, i) => daysInPrevMonth - i)
    .reverse();

  // 今月の日付
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 合わせて返す
  return [...prevMonthDays, ...currentMonthDays];
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-11

  const days = generateCalendarDays(currentYear, currentMonth);

  // 前の月に移動
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // 次の月に移動
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const findTodosForDay = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
    return todos.filter((todo) => todo.dueDate === dateString);
  };
// p-4 border shadow-sm bg-gray-100 flex-grow
  return (
    <div className="p-4 shadow-sm bg-gray-100 flex-grow">
      <h2 className="text-2xl font-bold text-center text-gray-800 py-4">カレンダー</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          ＜ 前の月
        </button>
        <span className="text-lg font-semibold">{`${currentYear}年 ${currentMonth + 1}月`}</span>
        <button
          onClick={nextMonth}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          次の月 ＞
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 text-center">
        {weekDays.map((day) => (
          <div key={day} className="font-semibold text-gray-800">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dayTodos = findTodosForDay(day);
          const isPrevMonthDay = index < 7 && day > 20; // 前月の日付かどうか
          return (
            <div
              key={index}
              className={`p-4 border border-gray-200 flex flex-col justify-between items-center bg-white rounded-lg shadow min-h-[113px] ${
                isPrevMonthDay ? 'text-gray-400' : 'text-gray-800'
              } overflow-auto`}
            >
              <div className="text-lg">{day > 0 ? day : ''}</div> {/* 前月の日付を空で表示 */}
              <ul className="mt-2">
                {dayTodos.map((todo) => (
                  <li key={todo.id} className="text-xs text-blue-500 truncate">
                    {todo.title}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

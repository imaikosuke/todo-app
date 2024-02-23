import React, { useState } from 'react';
import { Todo } from '../../interface';

const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const generateCalendarDays = (year: number, month: number) => {
  const days = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 前月の日付を追加
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // 今月の日付を追加
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }

  return days;
};

interface CalendarProps {
  todos: Todo[];
}

const Calendar: React.FC<CalendarProps> = ({ todos }) => {
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

  const findTodosForDay = (todos: Todo[], year: number, month: number, day: number): Todo[] => {
    return todos.filter((todo) => {
      if (!todo.dueDate) return false;

      // タイムスタンプをDateオブジェクトに変換
      const dueDate = todo.dueDate.toDate();

      return dueDate.getFullYear() === year && dueDate.getMonth() === month && dueDate.getDate() === day;
    });
  };

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
        {days.map(({ day, isCurrentMonth }, index) => {
          // 現在の月に属する日付のみタスクを検索
          const dayTodos = isCurrentMonth ? findTodosForDay(todos, currentYear, currentMonth, day!) : [];
          return (
            <div
              key={index}
              className={`p-4 border border-gray-200 flex flex-col justify-between items-center bg-white rounded-lg shadow min-h-[113px] ${
                !isCurrentMonth ? 'text-gray-400' : 'text-gray-800'
              } overflow-auto`}
            >
              <div className="text-lg">{day}</div>
              <ul className="mt-2">
                {dayTodos.map((todo) => (
                  <li key={todo.id} className="text-base text-blue-500 truncate">
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

// src/pages/Sidebar/Sidebar.tsx

import { Link } from 'react-router-dom';
import LogoutButton from '@/components/LogoutButton';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-700 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block hover:bg-gray-600 px-2 py-1 rounded">
            タスク一覧
          </Link>
        </li>
        <li>
          <Link to="/category" className="block hover:bg-gray-600 px-2 py-1 rounded">
            カテゴリ一覧
          </Link>
        </li>
      </ul>
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;

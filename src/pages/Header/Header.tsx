// src/pages/Header/Header.tsx

import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import LogoutButton from '@/components/LogoutButton';

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Todoリスト</h1>
      <div className="flex items-center">
        <img src={user!.photoURL!} alt="Googleアカウントのアイコン" className="w-10 h-10 rounded-full" />
        <p className="ml-3">
          <strong>
            <span>{user?.email}</span>
          </strong>
        </p>
        <div className="ml-3">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
